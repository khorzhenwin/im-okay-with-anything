import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

export interface Location {
    latitude: string;
    longitude: string;
    locationName: string;
    setLatitude: (latitude: string) => void;
    setLongitude: (longitude: string) => void;
    setLocationName: (locationName: string) => void;
}

const useLocationStore = create<Location>()(
    devtools(
        persist(
            (set) => ({
                latitude: "0",
                longitude: "0",
                locationName: "Cheras, Malaysia",
                setLatitude: (latitude: string) => set(() => ({latitude})),
                setLongitude: (longitude: string) => set(() => ({longitude})),
                setLocationName: (locationName: string) => set(() => ({locationName})),
            }),
            {
                name: "location-storage",
            }
        )
    )
);

export default useLocationStore;
