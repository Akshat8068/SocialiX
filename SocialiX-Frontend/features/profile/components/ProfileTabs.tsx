"use client";

import { useState } from "react";
import Image from "next/image";
import {
    Grid3X3,
    Bookmark,
} from "lucide-react";
import clsx from "clsx";
import { Post } from "@/types/post";
import EmptyState from "@/components/common/EmptyState";

const tabs = [
    {
        id: "posts",
        icon: Grid3X3,
    },
    {
        id: "saved",
        icon: Bookmark,
    },
];

interface ProfileTabsProps {
    onPostClick: (posts: Post[]) => void;
    isOwnProfile: boolean;
    posts: Post[];
    savedPosts: Post[];
}

export default function ProfileTabs({
    onPostClick,
    isOwnProfile,
    posts,
    savedPosts,
}: ProfileTabsProps) {
    const [activeTab, setActiveTab] = useState("posts");

    const currentPosts =
        activeTab === "posts"
            ? posts
            : savedPosts;

    return (
        <section className="mt-8">

            <div className="border-b border-outline-variant/30">
                <div className="flex md:mx-auto md:max-w-lg">

                    {tabs.map((tab) => {
                        const Icon = tab.icon;

                        // Don't show Saved tab on other users' profiles
                        if (tab.id === "saved" && !isOwnProfile) {
                            return null;
                        }

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={clsx(
                                    "flex flex-1 items-center justify-center border-b-2 py-4 md:mx-5 transition",
                                    activeTab === tab.id
                                        ? "border-primary text-primary"
                                        : "border-transparent text-on-surface-variant hover:text-on-surface"
                                )}
                            >
                                <Icon size={22} />
                            </button>
                        );
                    })}

                </div>
            </div>

            {currentPosts.length === 0 ? (
                <EmptyState
                    variant="posts"
                    className="py-20"
                />
            ) : (
                <div className="mt-1 grid grid-cols-3 gap-1 md:mt-6 md:gap-3">

                    {currentPosts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => onPostClick(currentPosts)}
                            className="group relative aspect-square overflow-hidden bg-surface-container"
                        >
                            <Image
                                src={
                                    post.media?.[0]?.secureUrl ||
                                    "/Hero.jpg"
                                }
                                alt={post.caption || "Post"}
                                fill
                                className="object-cover transition duration-500 group-hover:scale-110"
                            />
                        </div>
                    ))}

                </div>
            )}

        </section>
    );
}