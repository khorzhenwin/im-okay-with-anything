class _ListingDetails {
    id: string = "";
    image: string = "";
    name: string = "";
    location: string = "";
    cuisine: string = "";
    votes: string[] = [];
}

export default interface ListingDetails extends _ListingDetails {}

type ListingDetailsProps = Array<keyof _ListingDetails>;

export const listingDetailsProps: ListingDetailsProps = Object.keys(new _ListingDetails()) as ListingDetailsProps;
