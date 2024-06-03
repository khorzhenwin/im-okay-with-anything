import Button from "@/components/buttons/Button";
import ListingCard from "@/components/cards/ListingCard";
import LocationInput from "@/components/input/LocationInput";
import useLocationStore from "@/stores/useLocationStore";
import { Group, NumberInput } from "@mantine/core";
import axios from "axios";
import { useCallback, useState } from "react";

const Election = ({ theme }: { theme: string }) => {
    const [restaurants, setRestaurants] = useState<RestaurantFinder.Feature[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchRadius, setSearchRadius] = useState(5);
    const [lat, lon] = useLocationStore((state) => [state.latitude, state.longitude]);

    const fetchRestaurants = useCallback(async () => {
        if (isLoading === true) return;

        setIsLoading(true);
        const res = await axios("/api/restaurant-finder", {
            params: { lat, lon, radius: searchRadius },
        });
        setRestaurants(res.data);
        setIsLoading(false);
    }, [isLoading, searchRadius, lat, lon]);

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
