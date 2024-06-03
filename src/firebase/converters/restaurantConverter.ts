import { pick } from "@/utils/helpers/propertyHelper";
import {
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
} from "firebase/firestore";
import Restaurant, { restaurantProps } from "../interfaces/restaurants";

export const restaurantConverter: FirestoreDataConverter<Restaurant> = {
  toFirestore(restaurant: WithFieldValue<Restaurant>): DocumentData {
    return pick<DocumentData>(restaurant, restaurantProps);
  },
  fromFirestore(snapshot, options): Restaurant {
    const data = snapshot.data(options)!;
    return pick<Restaurant>(data, restaurantProps);
  },
};
