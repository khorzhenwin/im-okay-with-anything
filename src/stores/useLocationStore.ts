import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

export interface Location {
    latitude: string;
    longitude: string;
    setLatitude: (latitude: string) => void;
    setLongitude: (longitude: string) => void;
}

const useLocationStore = create<Location>()(
    devtools(
        persist(
            (set) => ({
                latitude: "0",
                longitude: "0",
                setLatitude: (latitude: string) => set(() => ({latitude})),
                setLongitude: (longitude: string) => set(() => ({longitude})),
            }),
            {
                name: "recommendations-storage",
            }
        )
    )
);

export default useLocationStore;
