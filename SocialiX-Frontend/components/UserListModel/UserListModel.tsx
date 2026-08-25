"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import UserModelHeader from "./UserModelHeader";
import UserSearch from "./UserSearch";
import UserList from "./UserList";




export type UserListType =
    | "followers"
    | "following"
    | "requests" | "likes";

export interface FollowUser {
    id: number;

    requestId?: number;

    fullName: string;
    username: string;
    profilePicture: string | null | undefined
    isVerified?: boolean;

    isFollowing?: boolean;
    followsYou?: boolean;
    requested?: boolean;
}

interface FollowListModalProps {
    open: boolean;
    onClose: () => void;

    type: UserListType;

    title: string;
    count: number;

    users: FollowUser[];

    loading?: boolean;

    search: string;
    onSearchChange: (value: string) => void;

    onFollow?: (id: number) => void;
    onUnfollow?: (id: number) => void;
    onRemoveFollower?: (id: number) => void
    onAccept?: (id: number) => void;
    onReject?: (id: number) => void;
    isOwnProfile?: boolean;
    onMessage?: (id: number) => void;
}

export default function UserListModel({
    open,
    onClose,
    isOwnProfile = false,
    title,
    count,
    users,

    loading = false,

    type,

    search,
    onSearchChange,
    onRemoveFollower,
    onFollow,
    onUnfollow,

    onAccept,
    onReject,

    onMessage,
}: FollowListModalProps) {
    useEffect(() => {
        if (!open) return;

        document.body.style.overflow = "hidden";

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-overlay z-40  backdrop-blur-sm animate-in fade-in duration-200"
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                className="fixed z-50 flex flex-col bg-surface-container text-on-surface shadow-2xl overflow-hidden
                    inset-x-0 bottom-0 max-h-[92vh] rounded-t-4xl animate-in slide-in-from-bottom duration-300
                    md:left-1/2 md:top-1/2 md:right-auto md:bottom-auto md:inset-x-auto
                    md:w-[560px] md:max-h-[80vh]
                    md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl
                    animate-in
                    slide-in-from-bottom">
                {/* Grabber */}
                <div className="flex justify-center py-3 md:hidden">
                    <div className="h-1.5 w-14 rounded-full bg-outline" />
                </div>

                {/* Close Button Desktop */}
                <button
                    onClick={onClose}
                    className="active:scale-95 transition absolute right-4
                        top-4 hidden h-9 w-9 items-center justify-center rounded-full hover:bg-hover md:flex "
                >
                    <X size={18} />
                </button>

                {/* Header */}
                <UserModelHeader
                    title={title}
                    count={count}
                    onClose={onClose}
                />

                {/* Search */}
                <div className="px-5 pb-4">
                    <UserSearch
                        value={search}
                        onChange={onSearchChange}
                    />
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto">
                    <UserList
                        type={type}
                        onRemoveFollower={onRemoveFollower}
                        users={users}
                        loading={loading}
                        onFollow={onFollow}
                        onUnfollow={onUnfollow}
                        onAccept={onAccept}
                        onReject={onReject}
                        isOwnProfile={isOwnProfile}
                        onMessage={onMessage}
                    />
                </div>
            </div>
        </>
    );
}