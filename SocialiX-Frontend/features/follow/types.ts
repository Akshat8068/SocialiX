import { ApiResponse } from "@/types/api";
import { User } from "@/types/auth";

export type FollowStatus = "PENDING" | "ACCEPTED";

export interface Follow {
    id: number;
    follower: User;
    following: User;
    status: FollowStatus;
    createdAt: string;
    updatedAt: string;
}

export interface FollowRequest {
    userId: number;
}
export interface FollowActionRequest {
    id: number;
}


export type FollowResponse = ApiResponse<Follow>;
export interface FollowerItem {
    id: number;
    follower: User;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface FollowingItem {
    id: number;
    following: User;
    status: string;
    createdAt: string;
    updatedAt: string;
}
export interface FollowersResponse extends ApiResponse<FollowerItem[]> {
    count: number;
}

export interface FollowingResponse extends ApiResponse<FollowingItem[]> {
    count: number;
}

export interface FollowRequestUser {
  id: number;
  username: string;
  fullname: string;
  email: string;

  bio: string | null;
  website: string | null;

  profilePicture: string | null;
  profilePicturePublicId: string | null;

  isVerified: boolean;

  accountType: "PUBLIC" | "PRIVATE";

  professionalAccount: boolean;
}

export interface PendingRequest {
  id: number;

  follower: FollowRequestUser;

  status: "PENDING";

  createdAt: string;
  updatedAt: string;
}

export interface SentRequest {
  id: number;

  following: FollowRequestUser;

  status: "PENDING";

  createdAt: string;
  updatedAt: string;
}

export type PendingRequestsResponse = ApiResponse<PendingRequest[]>;

export type SentRequestsResponse = ApiResponse<SentRequest[]>;
export type MutualFollowersResponse = ApiResponse<User[]>;

export type FriendsResponse = ApiResponse<User[]>;

export type UnfollowResponse = ApiResponse<null>;

export type RemoveFollowerResponse = ApiResponse<null>;

export type AcceptRequestResponse = ApiResponse<Follow>;

export type RejectRequestResponse = ApiResponse<null>;

export type CancelRequestResponse = ApiResponse<null>;