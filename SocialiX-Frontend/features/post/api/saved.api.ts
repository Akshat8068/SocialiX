import baseApi from "@/store/api/baseApi";
import {
    GetAllSavedResponse,
    GetSingleSavedRequest,
    GetSingleSavedResponse,
    SavePostRequest,
    SavePostResponse,
} from "@/types/saved"
export const savedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        savePost: builder.mutation<SavePostResponse, SavePostRequest>({
            query: ({ postId }) => ({
                url: `/saved/${postId}`,
                method: "POST",
            }),

            async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
                // Optimistically toggle getSingleSaved for this post
                const singlePatch = dispatch(
                    savedApi.util.updateQueryData(
                        "getSingleSaved",
                        { postId },
                        (draft) => {
                            // If currently saved, unsave (set data to null); if not saved, mark as saved
                            // We can't construct a full Saved object here, so we toggle based on presence
                            if (draft.data) {
                                draft.data = null;
                            } else {
                                // Minimal placeholder — real data comes after invalidation refetch
                                draft.data = { id: -1 } as any;
                            }
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    singlePatch.undo();
                }
            },

            invalidatesTags: ["Post", "Saved"],
        }),

        getSingleSaved: builder.query<GetSingleSavedResponse,GetSingleSavedRequest>({
            query: ({ postId }) => ({
                url: `/saved/${postId}`,
            }),
            providesTags: ["Post","Saved"],
        }),

        getAllSaved: builder.query<GetAllSavedResponse, void>({
            query: () => ({
                url: "/saved",
            }),
            providesTags: ["Post","Saved"],
        }),
    }),
});

export const {
    useSavePostMutation,
    useGetSingleSavedQuery,
    useGetAllSavedQuery,
} = savedApi;