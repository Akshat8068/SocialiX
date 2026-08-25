import baseApi from "@/store/api/baseApi";
import { GetUsersResponse, ProfileResponse, UserProfileResponse, RemoveProfilePictureResponse, UpdateProfilePictureRequest, UpdateProfilePictureResponse, UpdateProfileRequest } from "@/types/profile";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileResponse, void>({
            query: () => ({
                url: "/user/profile",
                method: "GET",
            }),
            providesTags: ["Profile","Post"],
        }),

        updateProfile: builder.mutation<ProfileResponse,UpdateProfileRequest>({
            query: (data) => ({
                url: "/user/profile",
                method: "PUT",
                body:data,
            }),
            invalidatesTags: ["Profile"],
        }),

        updateProfilePicture: builder.mutation<UpdateProfilePictureResponse,UpdateProfilePictureRequest>({
            query: ({ profilePicture }) => {
                const formData = new FormData();
                formData.append("profilePicture", profilePicture);

                return {
                    url: "/user/profile-picture",
                    method: "PUT",
                    body: formData,
                };
            },
            invalidatesTags: ["Profile"],
        }),

        removeProfilePicture: builder.mutation<RemoveProfilePictureResponse,void>({
            query: () => ({
                url: "/user/profile-picture",
                method: "DELETE",
            }),
            invalidatesTags: ["Profile"],
        }),
        getUsers: builder.query<GetUsersResponse, void>({
            query: () => ({
                url: "/user/otherUsers",
                method: "GET",
            }),
            providesTags: ["Profile"],
        }),
        getUserProfile: builder.query<UserProfileResponse, number>({
            query: (userId) => ({
                
                url: `/user/otherUsers/${userId}`,
                method: "GET",
            }),
            providesTags: ["Profile","Post"],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdateProfilePictureMutation,
    useRemoveProfilePictureMutation,
    useGetUsersQuery,useGetUserProfileQuery
} = profileApi