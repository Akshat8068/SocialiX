import baseApi from "@/store/api/baseApi";
import {
    CreateCommentRequest,
    CreateCommentResponse,
    DeleteCommentRequest,
    DeleteCommentResponse,
    GetPostCommentsRequest,
    GetPostCommentsResponse,
    UpdateCommentRequest,
    UpdateCommentResponse,
} from "@/types/likeandComment";

export const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation<CreateCommentResponse,CreateCommentRequest>({
            query: ({ postId, content }) => ({
                url: `/comment/${postId}`,
                method: "POST",
                body: { content },
            }),
            invalidatesTags: ["Post","Comment"],
        }),

        replyComment: builder.mutation<UpdateCommentResponse,UpdateCommentRequest>({
            query: ({ commentId, content }) => ({
                url: `/comment/reply/${commentId}`,
                method: "POST",
                body: { content },
            }),
            invalidatesTags: ["Post","Comment"],
        }),

        updateComment: builder.mutation<UpdateCommentResponse,UpdateCommentRequest>({
            query: ({ commentId, content }) => ({
                url: `/comment/${commentId}`,
                method: "PUT",
                body: { content },
            }),
            invalidatesTags: ["Post","Comment"],
        }),

        deleteComment: builder.mutation<DeleteCommentResponse,DeleteCommentRequest>({
            query: ({ commentId }) => ({
                url: `/comment/${commentId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Post","Comment"],
        }),

        getPostComments: builder.query<GetPostCommentsResponse,GetPostCommentsRequest>({
            query: ({ postId }) => ({
                url: `/comment/${postId}`,
            }),
            providesTags: ["Post","Comment"],
        }),
    }),
});

export const {
    useCreateCommentMutation,
    useReplyCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useGetPostCommentsQuery,
} = commentApi;