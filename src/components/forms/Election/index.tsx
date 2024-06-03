import Button from "@/components/buttons/Button";
import LocationInput from "@/components/input/LocationInput";
import ListingDetails from "@/firebase/interfaces/listingDetails";
import Session from "@/firebase/interfaces/session";
import SessionRepository from "@/firebase/repository/sessionRepository";
import useLocationStore from "@/stores/useLocationStore";
import { Anchor, Group, NumberInput, Table } from "@mantine/core";
import axios from "axios";
import { DocumentData, DocumentReference, onSnapshot } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";

const Election = ({ theme }: { theme: string }) => {
    const [restaurants, setRestaurants] = useState<ListingDetails[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchRadius, setSearchRadius] = useState(5);
    const [lat, lon, place_id] = useLocationStore((state) => [state.latitude, state.longitude, state.locationId]);
    const [sessionId, setSessionId] = useState<string>();
    const [sessionRef, setSessionRef] = useState<DocumentReference<Session, DocumentData>>();

    const fetchRestaurants = useCallback(async () => {
        if (isLoading === true) return;

        setIsLoading(true);

        const res = await axios<RestaurantFinder.Feature[]>("/api/restaurant-finder", {
            params: { lat, lon, radius: searchRadius },
        });

        const sid = nanoid();
        setSessionId(sid);

        setSessionRef(
            await SessionRepository.add({
                location_id: place_id,
                session_id: sid,
                listing: res.data.map((d) => ({
                    cuisine: d.properties.catering?.cuisine ?? "",
                    id: d.properties.place_id,
                    location: d.properties.formatted ?? "Unknown Location",
                    name: d.properties.name_international?.en ?? d.properties.name ?? "Unknown Restaurant",
                    votes: [],
                    image: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
                })),
            }),
        );

        setIsLoading(false);
    }, [isLoading, searchRadius, lat, lon, place_id]);

    useEffect(() => {
        if (sessionRef == null) return;

        const unsub = onSnapshot(sessionRef, (snap) => {
            if (!snap || !snap.exists()) return;

            setRestaurants(snap.data().listing);
        });

        return () => {
            unsub();
        };
    }, [sessionRef]);

    return (
        <>
            <LocationInput theme={theme} />
            <NumberInput value={searchRadius} onChange={(e: number) => setSearchRadius(e)} label="Search Radius (KM)" />
            <Group position="right" mt="md" pt={8}>
                <Button loading={isLoading} onClick={() => fetchRestaurants()} color={theme}>
                    Start Voting!
                </Button>
            </Group>
            {sessionId && (
                <>
                    <div>
                        Send this link to your friends: <Anchor href={`/session/${sessionId}`}>Vote Here</Anchor>
                    </div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Restaurant Name</th>
                                <th>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restaurants
                                .sort((a, b) => b.votes.length - a.votes.length)
                                .map((r) => (
                                    <tr key={r.id}>
                                        <td>{r.name}</td>
                                        <td>{r.votes.length}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    );
};

export default Election;
