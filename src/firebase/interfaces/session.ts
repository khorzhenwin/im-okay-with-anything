import ListingDetails from "./listingDetails";

class _Session {
    id?: string = "";
    session_id: string = "";
    location_id: string = "";
    listing: ListingDetails[] = [];
}

export default interface Session extends _Session {}

type SessionProps = Array<keyof Session>;

export const sessionProps: SessionProps = Object.keys(new _Session()) as SessionProps;
