"use client";

import Image from "next/image";
import {
    BadgeCheck,
    MapPin,
    MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface PostHeaderProps {
    fullname: string;
    username: string;
    profilePicture?: string;
    createdAt: string;
    isOwnPost?: boolean;
    verified?: boolean;
    id: number;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function PostHeader({
    fullname, id,
    username,
    profilePicture,
    isOwnPost,
    createdAt,
    verified = false,
    onEdit,
    onDelete

}: PostHeaderProps) {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
                <Link href={`/user/${id}`}>
                    <Image
                        src={profilePicture || "/Hero.jpg"}
                        alt={fullname}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                    />
                </Link>

                <div>
                    <div className="flex items-center gap-1">
                        <Link href={`/user/${id}`}>
                            <h3 className="text-base font-semibold">
                                {username}
                            </h3></Link>
                    </div>

                    <p className="flex items-center gap-1 text-xs text-muted-foreground">

                        <span>{new Date(createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                        })}</span>
                    </p>
                </div>
            </div>

            {isOwnPost && (
                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="rounded-full p-2 hover:bg-gray-100"
                    >
                        <MoreHorizontal size={20} />
                    </button>

                    {open && (
                        <div className="absolute right-0 top-10 z-50 w-40 rounded-lg border bg-white shadow-lg">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onEdit?.();
                                }}
                                className="block w-full border-b px-4 py-3 text-left text-sm hover:bg-gray-100"
                            >
                                Edit Post
                            </button>

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onDelete?.();
                                }}
                                className="block w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                                Delete Post
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}