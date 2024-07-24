import ListingCard from "@/components/cards/ListingCard";
import {sessionConverter} from "@/firebase/converters/sessionConverter";
import FirebaseDoc from "@/firebase/interfaces/firebaseDoc";
import Session from "@/firebase/interfaces/session";
import SessionRepository from "@/firebase/repository/sessionRepository";
import useCurrentUserStore from "@/stores/useCurrentUserStore";
import {SwipeDirection} from "@/utils/types/card";
import {runTransaction} from "firebase/firestore";
import {useRouter} from "next/router";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {db} from "../../../../firebase";
import {Table, Text} from "@mantine/core";
import ListingDetails from "@/firebase/interfaces/listingDetails";

const SessionPage = () => {
    const theme = "violet";
    const router = useRouter();
    const [name, hasFinishedVoting, setName] = useCurrentUserStore((state) => [
        state.name,
        state.hasFinishedVoting,
        state.setName
    ]);
    const [sessionId , setSessionId] = useState<string>("");
    const [session, setSession] = useState<FirebaseDoc<Session>>();
    const [restaurantList, setRestaurantList] = useState<ListingDetails[]>([]);
    const firstPrompt = useRef(true);

    useEffect( () => {
        // get final votes
        async function fetchFinalList () {
            const restaurantList = SessionRepository.findBySessionId(sessionId).then((s) => {
                if (!s || !s.exists()) return;
                return s.data().listing;
            });

            setRestaurantList(await restaurantList.then((r) => r ?? []));
        }
        fetchFinalList().then(r => {});
    }, [session, hasFinishedVoting]);

    useEffect(() => {
        if (!router.isReady) return;

        const {id} = router.query;
        if (!id) return;

        setSessionId(id as string);

        SessionRepository.findBySessionId(id as string).then((s) => {
            if (s == null || !s.exists()) {
                router.replace("/");
                return;
            }

            setSession({data: s.data(), ref: s.ref});
        });
    }, [router]);

    useEffect(() => {
        if (firstPrompt.current && name.trim() === "") {
            let input = prompt("Enter a name");

            while (input == null || input.trim() == "") {
                input = prompt("Enter a name");
            }

            setName(input);
            firstPrompt.current = false;
        }
    }, []);

    const handleSwipe = async (direction: SwipeDirection, id: string, index: number) => {
        if (session == null) return;

        if (direction === "right") {
            await runTransaction(db, async (txn) => {
                const sDoc = await txn.get(session.ref);
                if (!sDoc.exists()) throw "Document does not exist";

                const data = {...sDoc.data()};

                data.listing[index].votes.push(name);

                txn.update(session.ref, sessionConverter.toFirestore(data));
            });
        }
    };

    return (
        <>
            <div className="flex min-h-screen w-full flex-col items-stretch overflow-hidden">
                <h3 className="pb-2 text-2xl font-semibold text-white md:text-3xl">{`I'm Okay With Anything`}</h3>
                <p className="pb-4 text-justify text-xs text-gray-500">
                    The age old response whenever you ask your friends what to eat
                </p>
                {session && (
                    !hasFinishedVoting ? (
                        <ListingCard
                            onSwipe={handleSwipe}
                            theme={theme}
                            cardList={session.data.listing.filter((l) => !l.votes.includes(name))}
                        />) : (
                        <>
                            <Text pt={16} pb={4} weight={"bold"} size={"xl"}>
                                Leaderboard Results
                            </Text>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Restaurant Name</th>
                                    <th>Votes</th>
                                    <th>Voted by</th>
                                </tr>
                                </thead>
                                <tbody>
                                {restaurantList
                                    .sort((a, b) => b.votes.length - a.votes.length)
                                    .map((r) => (
                                        <tr key={r.id}>
                                            <td>{r.name}</td>
                                            <td>{r.votes.length}</td>
                                            <td>{r.votes.join()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>)
                )}
            </div>
        </>
    );
};

export default SessionPage;
