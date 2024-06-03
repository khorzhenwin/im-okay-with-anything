import { pick } from "@/utils/helpers/propertyHelper";
import { DocumentData, FirestoreDataConverter, WithFieldValue } from "firebase/firestore";
import Session, { sessionProps } from "../interfaces/session";

export const sessionConverter: FirestoreDataConverter<Session> = {
    toFirestore(restaurant: WithFieldValue<Session>): DocumentData {
        return pick<DocumentData>(restaurant, sessionProps);
    },
    fromFirestore(snapshot, options): Session {
        const data = snapshot.data(options)!;
        return pick<Session>(data, sessionProps);
    },
};
