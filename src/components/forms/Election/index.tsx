import Button from "@/components/buttons/Button";
import ListingCard from "@/components/cards/ListingCard";
import LocationInput from "@/components/input/LocationInput";
import { CardInterface } from "@/utils/types/card";
import { Group } from "@mantine/core";
import axios from "axios";
import { useCallback, useState } from "react";

const Election = ({ theme }: { theme: string }) => {
    const [restaurants, setRestaurants] = useState<CardInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchRestaurants = useCallback(() => {
        if (isLoading === true) return;

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                setIsLoading(true);
                const res = await axios("/api/restaurant-finder", {
                    params: { lat: pos.coords.latitude, lng: pos.coords.longitude, radius: 6 },
                });
                setRestaurants(res.data.map((d: any) => ({ restaurantName: d.tags.name, id: d.id }) as CardInterface));
                setIsLoading(false);
            },
            (err) => {
                console.log(err);
                setIsLoading(false);
            },
            { enableHighAccuracy: true },
        );
    }, [isLoading]);

    return (
        <>
            <LocationInput theme={theme} />
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
