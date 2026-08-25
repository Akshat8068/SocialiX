import { ApiResponse } from "./api";
import { User } from "./auth";

export interface Hashtag {
  id: number;
  name: string;
  isPublic: boolean;
  postCount: number;
  createdAt: string;

  owner?: User;
}

export interface CreateHashtagRequest {
  name: string;
}

export interface GetHashtagRequest {
  name: string;
}

export interface DeleteHashtagRequest {
  hashtagId: number;
}

export type HashtagResponse = ApiResponse<Hashtag>;
export type GetAllHashtagsResponse = ApiResponse<Hashtag[]>;

export type HashtagsListResponse = ApiResponse<Hashtag[]>;

export interface DeleteHashtagResponse {
  success: boolean;
  message: string;
}