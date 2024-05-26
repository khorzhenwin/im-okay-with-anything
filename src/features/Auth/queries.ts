import {apiClient} from "@/features/Auth/AxiosProvider";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/features/Auth/types";

const queryKeys = {
    me: ["me"],
};

export const useUserQuery = () => {
    return useQuery({
        queryKey: queryKeys.me,
        queryFn: async () => {
            try {
                const data = await apiClient.get("/auth/me");
                return data.data as User;
            } catch (exception) {
                return null;
            }
        },
        retry: false,
    });
};
