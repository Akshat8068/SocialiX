"use client";


import { FollowUser, UserListType } from "./UserListModel";
import { Button } from "../ui/button";
import { boolean } from "zod";

interface FollowActionsProps {
    user: FollowUser;
    type: UserListType;
    onFollow?: (id: number) => void;
    onUnfollow?: (id: number) => void;
    onMessage?: (id: number) => void;
    onRemoveFollower?: (id: number) => void
isOwnProfile :boolean
}

export default function UserActions({
    user,
    onFollow,
    onRemoveFollower,
    isOwnProfile,
    type,
    onUnfollow,
    onMessage,
}: FollowActionsProps) {
    const isFollowing = user.isFollowing ?? false;
    const requested = user.requested ?? false;
    if (user.requested) {
        return (
            <Button onClick={() => user.requestId && onUnfollow?.(user.requestId)}>
                Cancel Request
            </Button>
        );
    }

    // Followers list
    if (type === "followers") {
        if (isOwnProfile) {
            return (
                <Button onClick={() => onRemoveFollower?.(user.id)}>
                    Remove
                </Button>
            );
        }

        return <Button>View Profile</Button>;
    }

    // Following list
    if (type === "following") {
        return (
            <Button
                onClick={() => onUnfollow?.(user.id)}
            >
                unFollow
            </Button>
        );
    }

    // Default
    return (
        <Button onClick={() => onFollow?.(user.id)}>
            Follow
        </Button>
    );

}