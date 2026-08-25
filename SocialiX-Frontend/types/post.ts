import { ApiResponse } from "./api";
import { User } from "./auth";
import { Hashtag } from "./hashTag";

export interface PostMedia {
    id: number;
    url: string;
    publicId: string;
    secureUrl: string
}
export interface PostHashtag {
    is: number;
    createdAt: string;
    hashtag: Hashtag;
}
export interface Post {
    id: number;
    caption?: string | null;
    user: User;
    media: PostMedia[];
    hashtags: PostHashtag[]
    createdAt: string;
    isLiked: boolean;
    updatedAt: string;
    likeCount: number;

    commentCount: number
}

export interface HomeFeedResponse {
    success: boolean;
    message: string;
    data: Post[];
}
export interface CreatePostRequest {
    caption?: string;
    hashtag?: Hashtag;
    visibility?: boolean
    media: File[];
}

export interface UpdatePostRequest {
    postId: number;
    caption?: string;
    media?: File[];
    hashtag?: Hashtag;
    formData: string
}

export interface PostRequest {
    postId: number;
}

export interface GetUserPostRequest {
    userId: number;
    postId: number;
}
export interface GetUserPostsRequest {
    userId: number;
}
export type PostResponse = ApiResponse<Post>;

export interface DeletePostResponse {
    success: boolean;
    message: string;
}

export type GetUserPostsResponse = ApiResponse<Post[]>;

export type GetUserPostResponse = ApiResponse<Post>;