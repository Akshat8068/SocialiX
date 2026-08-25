"use client";

import { User } from "@/types/auth";

interface Comment {
    id: number;
    content: string;
    user: User
}

interface PostCommentsProps {
    comments?: Comment[];
    totalComments?: number;
    onViewAll?: () => void;
}

export default function PostComments({
    comments = [],
    totalComments = 0,
    onViewAll,
}: PostCommentsProps) {
    return (
        <div className="space-y-3  px-4 pt-3">
            {comments.slice(0, 2).map((comment) => (
                <div key={comment.id} className="flex gap-2 text-sm">
                    <span className="font-semibold">
                        {comment.user.username}
                    </span>

                    <span className="text-muted-foreground">
                        {comment.content}
                    </span>
                </div>
            ))}

            {totalComments > 2 && (
                <button
                    onClick={onViewAll}
                    className="pb-3 text-sm font-medium text-primary"
                >
                    View all {totalComments} comments
                </button>
            )}
        </div>
    );
}