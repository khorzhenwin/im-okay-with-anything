import useLocationStore from "@/stores/useLocationStore";
import { Autocomplete, Box, LoadingOverlay, rem } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { IconMapPin } from "@tabler/icons-react";
import axios from "axios";
import "dotenv/config";
import { useCallback, useEffect, useState } from "react";

const LocationInput = ({ theme }: { theme: string }) => {
    const [loadingAnimation, loadingAnimationHandlers] = useDisclosure(false);
    const [locationName, setLocationName, setLatitude, setLongitude, setLocationId] = useLocationStore((state) => [
        state.locationName,
        state.setLocationName,
        state.setLatitude,
        state.setLongitude,
        state.setLocationId,
    ]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [debouncedQuery] = useDebouncedValue(locationName, 500);
    const [addressOptions, setAddressOptions] = useState<AddressAutocomplete.Result[]>([]);

    const fetchAddressAutocomplete = useCallback(async () => {
        if (debouncedQuery.trim().length === 0) return;

        const res = await axios.get<AddressAutocomplete.Result[]>("/api/address-autocomplete", {
            params: { text: debouncedQuery },
        });

        setAddressOptions(res.data);
    }, [debouncedQuery]);

    useEffect(() => {
        fetchAddressAutocomplete();
    }, [fetchAddressAutocomplete]);

    const getUserLocation = useCallback(() => {
        if (isLoading === true) return;

        // Reverse geocode based on lat lon
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                setIsLoading(true);

                const res = await axios<ReverseGeocoder.Result[]>("/api/reverse-geocoder", {
                    params: { lat: pos.coords.latitude, lon: pos.coords.longitude },
                });

                setIsLoading(false);

                if (res.data.length === 0) {
                    alert("Can't find where you're located at currently, try again later.");
                    return;
                }

                const { formatted, lat, lon, place_id } = res.data[0];
                setLocationName(formatted);
                setLocationId(place_id);
                setLatitude(lat.toString());
                setLongitude(lon.toString());
            },
            (err) => {
                console.log(err);
                setIsLoading(false);
            },
            { enableHighAccuracy: true },
        );
    }, [isLoading, setLatitude, setLongitude, setLocationName, setLocationId]);

    const icon = <IconMapPin style={{ width: rem(16), height: rem(16) }} onClick={getUserLocation} />;

    return (
        <>
            <Box mt={"xl"}>
                <Box pos="relative">
                    <LoadingOverlay visible={loadingAnimation} zIndex={1000} overlayBlur={0} overlayOpacity={0.5} />
                    <Autocomplete
                        data={addressOptions.map((a) => ({
                            value: a.formatted,
                            lat: a.lat,
                            lon: a.lon,
                            place_id: a.place_id,
                        }))}
                        value={locationName}
                        onChange={setLocationName}
                        onItemSubmit={(item) => {
                            setLocationName(item.value);
                            setLocationId(item.place_id);
                            setLatitude(item.lat);
                            setLongitude(item.lon);
                        }}
                        label="Enter your location"
                        placeholder="Cheras, Kuala Lumpur"
                        rightSectionProps={{ style: { cursor: "pointer" } }}
                        rightSection={icon}
                    />
                </Box>
            </Box>
        </>
    );
};

export default LocationInput;
