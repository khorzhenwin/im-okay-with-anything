import ListingDetails from "./listingDetails";

class _Restaurants {
  id?: string = "";
  session_id: string = "";
  location_id: string = "";
  listing: ListingDetails[] = [];
}

export default interface Restaurant extends _Restaurants {}

type RestaurantProps = Array<keyof Restaurant>;

export const restaurantProps: RestaurantProps = Object.keys(new _Restaurants()) as RestaurantProps;
