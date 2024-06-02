import Button from "@/components/buttons/Button";
import ListingCard from "@/components/cards/ListingCard";
import LocationInput from "@/components/input/LocationInput";
import { CardInterface } from "@/utils/types/card";
import { Feature } from "@/utils/types/restaurant-finder";
import { Group, NumberInput } from "@mantine/core";
import axios from "axios";
import { useCallback, useState } from "react";

const Election = ({ theme }: { theme: string }) => {
    const [restaurants, setRestaurants] = useState<Feature[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchRadius, setSearchRadius] = useState(5);

    const fetchRestaurants = useCallback(() => {
        if (isLoading === true) return;

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                setIsLoading(true);
                const res = await axios("/api/restaurant-finder", {
                    params: { lat: pos.coords.latitude, lng: pos.coords.longitude, radius: searchRadius },
                });
                setRestaurants(res.data);
                setIsLoading(false);
            },
            (err) => {
                console.log(err);
                setIsLoading(false);
            },
            { enableHighAccuracy: true },
        );
    }, [isLoading, searchRadius]);

    return (
        <>
            <LocationInput theme={theme} />
            <NumberInput value={searchRadius} onChange={(e: number) => setSearchRadius(e)} label="Search Radius (KM)" />
            <Group position="right" mt="md" pt={8}>
                <Button loading={isLoading} onClick={() => fetchRestaurants()} color={theme}>
                    Start Voting!
                </Button>
            </Group>
            <ListingCard theme={theme} cardList={restaurants} />
        </>
    );
};

export default Election;
