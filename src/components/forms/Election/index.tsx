import Button from "@/components/buttons/Button";
import ListingCard from "@/components/cards/ListingCard";
import LocationInput from "@/components/input/LocationInput";
import { CardInterface } from "@/utils/types/card";
import { Group } from "@mantine/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Election = ({ theme }: { theme: string }) => {
    const [restaurants, setRestaurants] = useState<CardInterface[]>([]);
    const isLoading = useRef(false);

    useEffect(() => {
        if (isLoading.current === true) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                isLoading.current = true;
                axios("/api/restaurant-finder", {
                    params: { lat: pos.coords.latitude, lng: pos.coords.longitude, radius: 6 },
                })
                    .then((res) => {
                        setRestaurants(res.data.map((d: any) => ({ restaurantName: d.tags.name, id: d.id }) as CardInterface));
                    })
                    .finally(() => {
                        isLoading.current = true;
                    });
            },
            (err) => {
                console.log(err);
                isLoading.current = true;
            },
            { enableHighAccuracy: true },
        );
    }, []);

    return (
        <>
            <LocationInput theme={theme} />
            <Group position="right" mt="md" pt={8}>
                <Button color={theme}>Start Voting!</Button>
            </Group>
            <ListingCard theme={theme} cardList={restaurants} />
        </>
    );
};

export default Election;
