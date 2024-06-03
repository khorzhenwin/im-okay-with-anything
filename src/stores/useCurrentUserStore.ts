import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface CurrentUser {
    name: string;
    setName: (name: string) => void;
}

const useCurrentUserStore = create<CurrentUser>()(
    devtools(
        persist(
            (set) => ({
                name: "",
                setName: (name: string) => set(() => ({ name })),
            }),
            {
                name: "current-user-storage",
            },
        ),
    ),
);

export default useCurrentUserStore;
