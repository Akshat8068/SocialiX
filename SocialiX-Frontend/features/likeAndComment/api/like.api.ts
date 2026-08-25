import baseApi from "@/store/api/baseApi";
import { GetLikedUsersResponse, LikeRequest, ToggleLikeResponse } from "@/types/likeandComment";

export const likeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        toggleLike: builder.mutation<ToggleLikeResponse, LikeRequest>({
            query: ({ postId }) => ({
                url: `/likes/${postId}`,
                method: "POST",
            }),

            invalidatesTags: ["Post", "Like"],
        }),

        getLikedUsers: builder.query<GetLikedUsersResponse, LikeRequest>({
            query: ({ postId }) => ({
                url: `/likes/${postId}/users`,
            }),
            providesTags: ["Post","Like"],
        }),
    }),
});

export const {
    useToggleLikeMutation,
    useGetLikedUsersQuery,
} = likeApi;