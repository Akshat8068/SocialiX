export interface FollowResponse {
    success: boolean;
    message: string;
    data: {
        id: number;
        status: "PENDING" | "ACCEPTED";
        follower: {
            id: number;
        };
        following: {
            id: number;
        };
        createdAt: string;
        updatedAt: string;
    };
}
export interface UnFollowResponse {
    success: boolean;
    message: string;
}