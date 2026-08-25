import { ApiResponse } from "./api";
import { User } from "./auth";

export interface UpdateProfileRequest {
    bio?: string;
    website?: string;
    accountType?: "PUBLIC" | "PRIVATE";
    professionalAccount?: boolean;
}

export interface UpdateProfilePictureRequest {
    profilePicture: File;
}

export type ProfileResponse = ApiResponse<User>;
export interface UserProfileData {
    user: User;
    isFollowing: boolean;
}

export type UserProfileResponse = ApiResponse<UserProfileData>;
export interface GetUsersResponse {
  success: boolean;
  message: string;
  data: User[];
}
export interface UpdateProfilePictureData {
    profilePicture: string;
}

export type UpdateProfilePictureResponse =
    ApiResponse<UpdateProfilePictureData>;

export type RemoveProfilePictureResponse = ApiResponse<null>;