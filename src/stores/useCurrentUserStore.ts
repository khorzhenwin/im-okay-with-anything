import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface CurrentUser {
    name: string;
    hasFinishedVoting: boolean;
    setName: (name: string) => void;
    setHasFinishedVoting: (hasFinishedVoting: boolean) => void;
}

const useCurrentUserStore = create<CurrentUser>()(
    devtools(
        persist(
            (set) => ({
                name: "",
                hasFinishedVoting: false,
                setName: (name: string) => set(() => ({ name })),
                setHasFinishedVoting: (hasFinishedVoting: boolean) => set(() => ({ hasFinishedVoting })),
            }),
            {
                name: "current-user-storage",
            },
        ),
    ),
);

export default useCurrentUserStore;
