import baseApi from "@/store/api/baseApi";
import { CreatePostRequest, DeletePostResponse, GetUserPostRequest, GetUserPostResponse, GetUserPostsRequest, GetUserPostsResponse, HomeFeedResponse, PostRequest, PostResponse, UpdatePostRequest } from "@/types/post";

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<PostResponse, FormData>({
            query: (formData) => {
                return {
                    url: "/post",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ["Profile","Post"],
        }),

        getPost: builder.query<PostResponse, PostRequest>({
            query: ({ postId }) => ({
                url: `/post/${postId}`,
            }),
            providesTags: ["Profile","Post"],
        }),

        updatePost: builder.mutation<PostResponse, UpdatePostRequest>({
            query: ({ postId, formData}) => {
                return {
                    url: `/post/${postId}`,
                    method: "PUT",
                    body: formData,
                };
            },
            invalidatesTags: ["Profile","Post"],
        }),

        deletePost: builder.mutation<DeletePostResponse, PostRequest>({
            query: ({ postId }) => ({
                url: `/post/${postId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Profile","Post"],
        }),

        getUserPosts: builder.query<GetUserPostsResponse, GetUserPostsRequest>({
            query: ({ userId }) => ({
                url: `/post/${userId}/posts`,
            }),
            providesTags: ["Profile","Post"],
        }),

        getUserPost: builder.query<GetUserPostResponse, GetUserPostRequest>({
            query: ({ userId, postId }) => ({
                url: `/post/${userId}/post/${postId}`,
            }),
            providesTags: ["Profile","Post"],
        }),
        getHomeFeed: builder.query<HomeFeedResponse, void>({
            query: () => ({
                url: "/post/feed",
            }),
            providesTags: ["Post"],
        })
    }),
});

export const {
    useCreatePostMutation,
    useGetPostQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
    useGetUserPostsQuery,
    useGetUserPostQuery,
    useGetHomeFeedQuery
} = postApi;