import Button from "@/components/buttons/Button";
import LocationInput from "@/components/input/LocationInput";
import ListingDetails from "@/firebase/interfaces/listingDetails";
import Session from "@/firebase/interfaces/session";
import SessionRepository from "@/firebase/repository/sessionRepository";
import useLocationStore from "@/stores/useLocationStore";
import {Anchor, Group, NumberInput, Table, Text} from "@mantine/core";
import axios, {AxiosResponse} from "axios";
import {DocumentData, DocumentReference, onSnapshot} from "firebase/firestore";
import {nanoid} from "nanoid";
import {useCallback, useEffect, useState} from "react";

const Election = ({theme}: { theme: string }) => {
    const [restaurants, setRestaurants] = useState<ListingDetails[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchRadius, setSearchRadius] = useState(5);
    const [lat, lon, place_id] = useLocationStore((state) => [state.latitude, state.longitude, state.locationId]);
    const [sessionId, setSessionId] = useState<string>();
    const [sessionRef, setSessionRef] = useState<DocumentReference<Session, DocumentData>>();

    const fetchRestaurants = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);

        const res: AxiosResponse<RestaurantFinder.Feature[]> = await axios<RestaurantFinder.Feature[]>("/api/restaurant-finder", {
            params: {lat, lon, radius: searchRadius},
        });
        // take only 1st 15 restaurants
        const restaurantData: RestaurantFinder.Feature[] = res.data.slice(0, 15);

        const sid: string = nanoid();
        setSessionId(sid);

        setSessionRef(
            await SessionRepository.add({
                location_id: place_id,
                session_id: sid,
                listing: restaurantData.map((d) => ({
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
            // take only 1st 15 restaurants
            setRestaurants(snap.data().listing.slice(0, 15));
        });

        return () => {
            unsub();
        };
    }, [sessionRef]);

    return (
        <>
            <LocationInput theme={theme}/>
            <NumberInput pt={8} value={searchRadius} onChange={(e: number) => setSearchRadius(e)}
                         label="Search Radius (KM)"/>
            <Group position="right" mt="md" py={8}>
                <Button loading={isLoading} onClick={() => fetchRestaurants()} color={theme}>
                    Start Voting!
                </Button>
            </Group>
            {sessionId && (
                <>
                    <Text py={8}>
                        Start voting {" "}
                        <Anchor underline={true} href={`/session/${sessionId}`} target={"_blank"}>
                            here
                        </Anchor>
                        !
                    </Text>
                    <Text pt={16} pb={4} weight={"bold"} size={"xl"}>
                        Leaderboard Results
                    </Text>
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
