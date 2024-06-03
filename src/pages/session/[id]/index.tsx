import ListingCard from "@/components/cards/ListingCard";
import { sessionConverter } from "@/firebase/converters/sessionConverter";
import FirebaseDoc from "@/firebase/interfaces/firebaseDoc";
import Session from "@/firebase/interfaces/session";
import SessionRepository from "@/firebase/repository/sessionRepository";
import useCurrentUserStore from "@/stores/useCurrentUserStore";
import { SwipeDirection } from "@/utils/types/card";
import { runTransaction } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";

const SessionPage = () => {
    const theme = "violet";
    const router = useRouter();
    const [name, setName] = useCurrentUserStore((state) => [state.name, state.setName]);
    const [session, setSession] = useState<FirebaseDoc<Session>>();

    useEffect(() => {
        if (!router.isReady) return;

        const { id } = router.query;

        if (id == null) return;

        if (name.trim() == "") {
            let input = prompt("Enter a name");

            while (input == null || input.trim() == "") {
                input = prompt("Enter a name");
            }

            setName(input);
        }

        SessionRepository.findBySessionId(id as string).then((s) => {
            if (s == null || !s.exists()) {
                router.replace("/");
                return;
            }

            setSession({ data: s.data(), ref: s.ref });
        });
    }, [router, name, setName]);

    const handleSwipe = async (direction: SwipeDirection, id: string, index: number) => {
        if (session == null) return;

        if (direction === "right") {
            await runTransaction(db, async (txn) => {
                const sDoc = await txn.get(session.ref);
                if (!sDoc.exists()) throw "Document does not exist";

                const data = { ...sDoc.data() };

                data.listing[index].votes.push(name);

                txn.update(session.ref, sessionConverter.toFirestore(data));
            });
        }
    };

    return (
        <div className="flex min-h-screen w-full flex-col items-stretch overflow-hidden">
            <h3 className="pb-2 text-2xl font-semibold text-white md:text-3xl">{`I'm Okay With Anything`}</h3>
            <p className="pb-4 text-justify text-xs text-gray-500">
                The age old response whenever you ask your friends what to eat
            </p>
            {session && (
                <ListingCard
                    onSwipe={handleSwipe}
                    theme={theme}
                    cardList={session.data.listing.filter((l) => !l.votes.includes(name))}
                />
            )}
        </div>
    );
};

export default SessionPage;
