import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Location {
    latitude: string;
    longitude: string;
    locationName: string;
    locationId: string;
    setLatitude: (latitude: string) => void;
    setLongitude: (longitude: string) => void;
    setLocationName: (locationName: string) => void;
    setLocationId: (locationId: string) => void;
}

const useLocationStore = create<Location>()(
    devtools(
        persist(
            (set) => ({
                latitude: "0",
                longitude: "0",
                locationName: "Cheras, Malaysia",
                locationId: "",
                setLatitude: (latitude: string) => set(() => ({ latitude })),
                setLongitude: (longitude: string) => set(() => ({ longitude })),
                setLocationName: (locationName: string) => set(() => ({ locationName })),
                setLocationId: (locationId: string) => set(() => ({ locationId })),
            }),
            {
                name: "location-storage",
            },
        ),
    ),
);

export default useLocationStore;
