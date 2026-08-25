import { User } from "./auth";
import { Post } from "./post";

export interface Saved {
    id: number;
    user: User;
    post: Post;
    createdAt: string;
}
export interface SavePostRequest {
    postId: number;
}

export interface SavePostResponse {
    success: boolean;
    message: string;
    data: Saved;
}

export interface GetSingleSavedRequest {
    postId: number;
}

export interface GetSingleSavedResponse {
    success: boolean;
    message: string;
    data: Saved | null;
}

export interface GetAllSavedResponse {
    success: boolean;
    message: string;
    data: Saved[];
}