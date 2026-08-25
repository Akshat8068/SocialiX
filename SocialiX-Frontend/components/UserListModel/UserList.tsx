"use client";

import UserCard from "./UserCard";
import { FollowUser, UserListType } from "./UserListModel";
import EmptyState from "@/components/common/EmptyState";

interface FollowListProps {
    type: UserListType;
    users: FollowUser[];
    loading?: boolean;
    isOwnProfile: boolean
    onFollow?: (id: number) => void;
    onUnfollow?: (id: number) => void;
    onRemoveFollower?: (id: number) => void;
    onAccept?: (id: number) => void;
    onReject?: (id: number) => void;

    onMessage?: (id: number) => void;
}

export default function UserList({
    type,
    users,
    loading = false,
    onRemoveFollower,
    onFollow,
    onUnfollow,
    isOwnProfile,
    onAccept,
    onReject,

    onMessage,
}: FollowListProps) {
    if (loading) {
        return (
            <div className="space-y-1 px-5 py-2">
                {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        );
    }

    if (!users.length) {
        const emptyVariant =
            type === "followers"
                ? "followers"
                : type === "following"
                    ? "following"
                    : type === "requests"
                        ? "pendingRequests"
                        : type === "likes"
                            ? "likes"
                            : "users";

        return <EmptyState variant={emptyVariant} className="h-72" />;
    }

    return (
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    type={type}
                    user={user}
                    onFollow={onFollow}
                    onUnfollow={onUnfollow}
                    onAccept={onAccept}
                    onReject={onReject}
                    onMessage={onMessage}
                    onRemoveFollower={onRemoveFollower}
                    isOwnProfile={isOwnProfile}

                />
            ))}
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="flex animate-pulse items-center gap-3 py-3">
            <div className="h-12 w-12 rounded-full bg-on-background" />

            <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-on-surface" />

                <div className="h-3 w-20 rounded bg-on-surface" />
            </div>

            <div className="h-10 w-24 rounded-xl bg-on-syrafce" />
        </div>
    );
}