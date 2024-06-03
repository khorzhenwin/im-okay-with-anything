import { restaurantConverter } from "../converters/restaurantConverter";
import { db } from "@/../firebase";
import Restaurant from "../interfaces/restaurants";
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

export const restaurantCollectionPath = "restaurants";

export default class RestaurantRepository {
  static ref = collection(db, restaurantCollectionPath).withConverter(restaurantConverter);

  static snapshot = (
    callback: (snapshot: QuerySnapshot<DocumentData>) => void
  ) => onSnapshot(this.ref, callback);

  // ----- GET METHODS -----
  static findAll = async () => await getDocs(RestaurantRepository.ref);

  static findById = async (id: string) =>
    (await getDocs(query(this.ref, where("id", "==", id)))).docs.at(0);

  static findBySessionId = async (id: string) =>
    (await getDocs(query(this.ref, where("session_id", "==", id)))).docs.at(0);

  static findBylocationId = async (id: string) =>
    (await getDocs(query(this.ref, where("location_id", "==", id)))).docs.at(0);

  static findByUserId = async (id: string) =>
    (await getDocs(query(this.ref, where("userId", "==", id)))).docs.at(0);

// ----- UPDATE METHODS -----
  static update = async (
    docRef: DocumentReference<Restaurant>,
    newValues: Partial<Restaurant>
  ) => {
    return runTransaction(db, async (txn) => {
      txn.update(docRef, newValues);
    });
  };

  // ----- ADD METHODS -----

  static add = async (values: Restaurant) => {
    return await addDoc(RestaurantRepository.ref, values);
  };

  static addListingById = async (id: string, listingId: string, listingDetails: ListingDetails) => {
    const docRef = await RestaurantRepository.findById(id);
    await RestaurantRepository.update(docRef!.ref, {
      listing: { ...docRef!.data().listing, [listingId]: listingDetails },
    });
  };

  static addListingBySessionId = async (sessionId: string, listingId: string, listingDetails: ListingDetails) => {
    const docRef = await RestaurantRepository.findBySessionId(sessionId);
    await RestaurantRepository.update(docRef!.ref, {
      listing: { ...docRef!.data().listing, [listingId]: listingDetails },
    });
  };

  static addVoteBySessionId = async (sessionId: string, listingId: string, vote: string) => {
    const docRef = await RestaurantRepository.findBySessionId(sessionId);
    const listing = docRef!.data().listing.find((listing) => listing.id === listingId);
    if (!listing) return;
    await RestaurantRepository.update(docRef!.ref, {
      listing: { ...docRef!.data().listing, [listingId]: { ...listing, votes: [...listing.votes, vote] } },
    });
  };

  static addVoteById = async (id: string, listingId: string, vote: string) => {
    const docRef = await RestaurantRepository.findById(id);
    const listing = docRef!.data().listing.find((listing) => listing.id === listingId);
    if (!listing) return;
    await RestaurantRepository.update(docRef!.ref, {
      listing: { ...docRef!.data().listing, [listingId]: { ...listing, votes: [...listing.votes, vote] } },
    });
  };

  // ----- REMOVE METHODS -----

  static removeListingsById = async (id: string) => {
    const docRef = await RestaurantRepository.findById(id);
    await RestaurantRepository.update(docRef!.ref, { listing: [] });
  };

  static removeAllVotesByIdAndListingId = async (id: string, listingId: string) => {
    const docRef = await RestaurantRepository.findById(id);
    const listing = docRef!.data().listing.find((listing) => listing.id === listingId);
    if (!listing) return;
    await RestaurantRepository.update(docRef!.ref, {
      listing: { ...docRef!.data().listing, [listingId]: { ...listing, votes: [] } },
    });
  };

  static removeVoteByIdAndListingIdAndName = async (id: string, listingId: string, name: string) => {
    const docRef = await RestaurantRepository.findById(id);
    const listing = docRef!.data().listing.find((listing) => listing.id === listingId);
    if (!listing) return;
    await RestaurantRepository.update(docRef!.ref, {
      listing: { ...docRef!.data().listing, [listingId]: { ...listing, votes: listing.votes.filter((vote) => vote.toLowerCase() !== name.toLowerCase()) } },
    });
  };
}
