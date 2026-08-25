import baseApi from "@/store/api/baseApi";

import { CreateHashtagRequest, DeleteHashtagRequest, DeleteHashtagResponse, GetHashtagRequest, HashtagResponse, HashtagsListResponse } from "@/types/hashTag";


export const hashtagApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createHashtag: builder.mutation<HashtagResponse, CreateHashtagRequest>({
            query: (data) => ({
                url: "/hashtag",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Post", "Hashtags"],
        }),

        // Search / lookup a single hashtag by name
        getHashtag: builder.query<HashtagResponse, GetHashtagRequest>({
            query: ({ name}) => ({
                url: "/hashtag/name",
                method: "GET",

                body: {
                    name,
                },
            }),
            providesTags: ["Post", "Hashtags"],
        }),


        getAllHashtags: builder.query<HashtagsListResponse, void>({
            query: () => ({
                url: "/hashtag",
                method: "GET",
            }),
            providesTags: ["Hashtags"],
        }),

        deleteHashtag: builder.mutation<DeleteHashtagResponse, DeleteHashtagRequest>({
            query: ({ hashtagId }) => ({
                url: `/hashtag/${hashtagId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post", "Hashtags"],
        }),
    }),
});

export const {
    useCreateHashtagMutation,
    useGetHashtagQuery,
    useGetAllHashtagsQuery,
    useDeleteHashtagMutation,
} = hashtagApi;