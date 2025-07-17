import ListingCard from "@/components/cards/ListingCard";
import { sessionConverter } from "@/firebase/converters/sessionConverter";
import FirebaseDoc from "@/firebase/interfaces/firebaseDoc";
import Session from "@/firebase/interfaces/session";
import SessionRepository from "@/firebase/repository/sessionRepository";
import useCurrentUserStore from "@/stores/useCurrentUserStore";
import { SwipeDirection } from "@/utils/types/card";
import { runTransaction } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { db } from "../../../../firebase";
import { Table, Text } from "@mantine/core";
import ListingDetails from "@/firebase/interfaces/listingDetails";

const SessionPage = () => {
    const theme = "violet";
    const router = useRouter();
    const [name, hasFinishedVoting, setName, setHasFinishedVoting] = useCurrentUserStore((state) => [
        state.name,
        state.hasFinishedVoting,
        state.setName,
        state.setHasFinishedVoting,
    ]);
    const [sessionId, setSessionId] = useState<string>("");
    const [session, setSession] = useState<FirebaseDoc<Session>>();
    const [restaurantList, setRestaurantList] = useState<ListingDetails[]>([]);
    const firstPrompt = useRef(true);

    useEffect(() => {
        // get final votes
        async function fetchFinalList() {
            const restaurantList = SessionRepository.findBySessionId(sessionId).then((s) => {
                if (!s || !s.exists()) return;
                return s.data().listing;
            });

            setRestaurantList(await restaurantList.then((r) => r ?? []));
        }
        fetchFinalList().then((r) => {});
    }, [session, hasFinishedVoting]);

    useEffect(() => {
        if (!router.isReady) return;

        const { id } = router.query;
        if (!id) return;

        // Reset the voting state when a new session is loaded
        setHasFinishedVoting(false);

        setSessionId(id as string);

        SessionRepository.findBySessionId(id as string).then((s) => {
            if (s == null || !s.exists()) {
                router.replace("/");
                return;
            }

            setSession({ data: s.data(), ref: s.ref });
        });
    }, [router, setHasFinishedVoting]);

    useEffect(() => {
        if (firstPrompt.current && name.trim() === "") {
            let input = prompt("Enter a name");

            while (input == null || input.trim() == "") {
                input = prompt("Enter a name");
            }

            setName(input);
            firstPrompt.current = false;
        }
    }, [name, setName]);

    const handleSwipe = async (direction: SwipeDirection, id: string, index: number) => {
        if (session == null) return;

        // Process the swipe regardless of direction
        // Only add a vote if the direction is "right"
        if (direction === "right") {
            await runTransaction(db, async (txn) => {
                const sDoc = await txn.get(session.ref);
                if (!sDoc.exists()) throw "Document does not exist";

                const data = { ...sDoc.data() };

                data.listing[index].votes.push(name);

                txn.update(session.ref, sessionConverter.toFirestore(data));
            });
        }

        // For left swipes, we don't need to update the database,
        // but we still need to let the card animation complete
        console.log(`Swiped ${direction} on restaurant: ${id}`);
    };

    return (
        <>
            <div className="flex min-h-screen w-full flex-col items-stretch overflow-hidden">
                <h3 className="pb-2 text-2xl font-semibold text-white md:text-3xl">{`I'm Okay With Anything`}</h3>
                <p className="pb-4 text-justify text-xs text-gray-500">
                    The age old response whenever you ask your friends what to eat
                </p>
                {session &&
                    (!hasFinishedVoting ? (
                        <ListingCard
                            onSwipe={handleSwipe}
                            theme={theme}
                            cardList={session.data.listing.filter((l) => !l.votes.includes(name))}
                        />
                    ) : (
                        <>
                            <Text pt={16} pb={4} fw={700} size={"xl"}>
                                Leaderboard Results
                            </Text>
                            <div style={{ width: "100%", overflowX: "auto" }}>
                                <table
                                    style={{
                                        width: "100%",
                                        borderCollapse: "collapse",
                                        tableLayout: "fixed",
                                    }}
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                style={{
                                                    width: "40%",
                                                    padding: "12px 16px",
                                                    textAlign: "left",
                                                    borderBottom: "2px solid #2C2E33",
                                                    color: "white",
                                                }}
                                            >
                                                Restaurant Name
                                            </th>
                                            <th
                                                style={{
                                                    width: "20%",
                                                    padding: "12px 16px",
                                                    textAlign: "center",
                                                    borderBottom: "2px solid #2C2E33",
                                                    color: "white",
                                                }}
                                            >
                                                Votes
                                            </th>
                                            <th
                                                style={{
                                                    width: "40%",
                                                    padding: "12px 16px",
                                                    textAlign: "right",
                                                    borderBottom: "2px solid #2C2E33",
                                                    color: "white",
                                                }}
                                            >
                                                Voted by
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {restaurantList
                                            .sort((a, b) => b.votes.length - a.votes.length)
                                            .map((r, index) => (
                                                <tr
                                                    key={r.id}
                                                    style={{
                                                        backgroundColor:
                                                            index % 2 === 0
                                                                ? "rgba(255, 255, 255, 0.05)"
                                                                : "transparent",
                                                    }}
                                                >
                                                    <td
                                                        style={{
                                                            padding: "12px 16px",
                                                            textAlign: "left",
                                                            borderBottom: "1px solid #2C2E33",
                                                            color: "white",
                                                        }}
                                                    >
                                                        {r.name}
                                                    </td>
                                                    <td
                                                        style={{
                                                            padding: "12px 16px",
                                                            textAlign: "center",
                                                            borderBottom: "1px solid #2C2E33",
                                                            color: "white",
                                                        }}
                                                    >
                                                        {r.votes.length}
                                                    </td>
                                                    <td
                                                        style={{
                                                            padding: "12px 16px",
                                                            textAlign: "right",
                                                            borderBottom: "1px solid #2C2E33",
                                                            color: "white",
                                                        }}
                                                    >
                                                        {r.votes.join(", ")}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ))}
            </div>
        </>
    );
};

export default SessionPage;
