"use client";

import FeedPost from "@/features/post/components/FeedPost";
import { Post } from "@/types/post";
import EmptyState from "@/components/common/EmptyState";

interface ProfileFeedViewProps {
    posts: Post[]
}

export default function ProfileFeedView({
    posts,
}: ProfileFeedViewProps) {
    if (posts.length === 0) {
        return <EmptyState variant="posts" className="py-20" />;
    }
    return (
        <div className=" mt-6 mx-1 max-w-200 space-y-8">
            {posts.map((post) => (
                <FeedPost
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    );
}