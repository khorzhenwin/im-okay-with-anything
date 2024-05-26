import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

interface Recommendations {
    recommendations: string[];
    setRecommendations: (recommendationsState: string[]) => void;
}

const useRecommendationStore = create<Recommendations>()(
    devtools(
        persist(
            (set) => ({
                recommendations: [],
                setRecommendations: (recommendationsState: string[]) => set({recommendations: recommendationsState}),
            }),
            {
                name: "recommendations-storage",
            }
        )
    )
);

export default useRecommendationStore;
