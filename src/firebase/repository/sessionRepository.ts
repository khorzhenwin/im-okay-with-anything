import { sessionConverter } from "../converters/sessionConverter";
import { db } from "@/../firebase";
import Session from "../interfaces/session";
import {
    DocumentData,
    DocumentReference,
    QuerySnapshot,
    collection,
    addDoc,
    getDocs,
    onSnapshot,
    query,
    runTransaction,
    where,
} from "firebase/firestore";
import ListingDetails from "../interfaces/listingDetails";

export const sessionCollectionPath = "session";

export default class SessionRepository {
    static ref = collection(db, sessionCollectionPath).withConverter(sessionConverter);

    static snapshot = (callback: (snapshot: QuerySnapshot<DocumentData>) => void) => onSnapshot(this.ref, callback);

    // ----- GET METHODS -----
    static findAll = async () => await getDocs(SessionRepository.ref);

    static findById = async (id: string) => (await getDocs(query(this.ref, where("id", "==", id)))).docs.at(0);

    static findBySessionId = async (id: string) =>
        (await getDocs(query(this.ref, where("session_id", "==", id)))).docs.at(0);

    static snapshotBySessionId = (id: string, callback: (session: Session | null) => void) => {
        const q = query(this.ref, where("session_id", "==", id));

        return onSnapshot(q, (snapshot) => {
            const doc = snapshot.docs.at(0);

            if (doc) {
                const session = {
                    id: doc.id,
                    ...doc.data(),
                } as Session;
                callback(session);
            } else {
                callback(null);
            }
        });
    };

    static findBylocationId = async (id: string) =>
        (await getDocs(query(this.ref, where("location_id", "==", id)))).docs.at(0);

    // ----- UPDATE METHODS -----
    static update = async (docRef: DocumentReference<Session>, newValues: Partial<Session>) => {
        return runTransaction(db, async (txn) => {
            txn.update(docRef, newValues);
        });
    };

    // ----- ADD METHODS -----
    static add = async (values: Session) => {
        return await addDoc(SessionRepository.ref, values);
    };

    static addListingById = async (id: string, listingId: string, listingDetails: ListingDetails) => {
        const docRef = await SessionRepository.findById(id);
        await SessionRepository.update(docRef!.ref, {
            listing: { ...docRef!.data().listing, [listingId]: listingDetails },
        });
    };

    static addListingBySessionId = async (sessionId: string, listingId: string, listingDetails: ListingDetails) => {
        const docRef = await SessionRepository.findBySessionId(sessionId);
        await SessionRepository.update(docRef!.ref, {
            listing: { ...docRef!.data().listing, [listingId]: listingDetails },
        });
    };

    static addVoteBySessionId = async (sessionId: string, listingId: string, vote: string) => {
        const docRef = await SessionRepository.findBySessionId(sessionId);
        const listing = docRef!.data().listing.find((listing) => listing.id === listingId);
        if (!listing) return;
        await SessionRepository.update(docRef!.ref, {
            listing: { ...docRef!.data().listing, [listingId]: { ...listing, votes: [...listing.votes, vote] } },
        });
    };

    static addVoteById = async (id: string, listingId: string, vote: string) => {
        const docRef = await SessionRepository.findById(id);
        const listing = docRef!.data().listing.find((listing) => listing.id === listingId);
        if (!listing) return;
        await SessionRepository.update(docRef!.ref, {
            listing: { ...docRef!.data().listing, [listingId]: { ...listing, votes: [...listing.votes, vote] } },
        });
    };

    // ----- REMOVE METHODS -----
    static removeListingsById = async (id: string) => {
        const docRef = await SessionRepository.findById(id);
        await SessionRepository.update(docRef!.ref, { listing: [] });
    };

    static removeAllVotesByIdAndListingId = async (id: string, listingId: string) => {
        const docRef = await SessionRepository.findById(id);
        const listing = docRef!.data().listing.find((listing) => listing.id === listingId);
        if (!listing) return;
        await SessionRepository.update(docRef!.ref, {
            listing: { ...docRef!.data().listing, [listingId]: { ...listing, votes: [] } },
        });
    };

    static removeVoteByIdAndListingIdAndName = async (id: string, listingId: string, name: string) => {
        const docRef = await SessionRepository.findById(id);
        const listing = docRef!.data().listing.find((listing) => listing.id === listingId);
        if (!listing) return;
        await SessionRepository.update(docRef!.ref, {
            listing: {
                ...docRef!.data().listing,
                [listingId]: {
                    ...listing,
                    votes: listing.votes.filter((vote) => vote.toLowerCase() !== name.toLowerCase()),
                },
            },
        });
    };
}
