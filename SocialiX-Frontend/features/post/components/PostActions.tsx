"use client";

import {
    Heart,
    MessageCircle,
    Send,
    Bookmark,
} from "lucide-react";

interface PostActionsProps {
    likes: number;
    comments: number;
    shares: number;
    isLiked?: boolean;
    isSaved?: boolean;
    onLike?: () => void;
    onLikesClick?: () => void;
    onSave?: () => void;
    onCommentsClick?: () => void;
}

export default function PostActions({
    likes,
    comments,
    onLike,
    shares,
    onLikesClick,
    isLiked = false,
    isSaved = false, onSave, onCommentsClick
}: PostActionsProps) {
    return (
        <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onLike}
                        className="transition-transform active:scale-95 hover:bg-surface-container-high"
                    >
                        <Heart
                            size={22}
                            className={
                                isLiked
                                    ? "fill-red-500 text-red-500"
                                    : "text-on-surface-variant hover:text-primary"
                            }
                        />
                    </button>

                    <button
                        type="button"
                        onClick={onLikesClick}
                        className="text-sm font-medium text-on-surface hover:text-primary hover:underline"
                    >
                        {likes}
                    </button>
                </div>

                <button
                    type="button"
                    onClick={onCommentsClick}
                    className="flex items-center gap-2 rounded-full p-1 text-on-surface-variant transition active:scale-95 hover:bg-surface-container-high hover:text-primary">
                    <MessageCircle
                        size={22}
                    />
                    <span className="text-sm text-on-surface">{comments}</span>
                </button>

                <button className="flex items-center gap-2 rounded-full p-1 text-on-surface-variant transition active:scale-95 hover:bg-surface-container-high hover:text-primary">
                    <Send
                        size={22}
                        className="text-muted-foreground hover:text-foreground"
                    />
                    <span className="text-sm text-on-surface">{shares}</span>
                </button>
            </div>

            <button className="rounded-full p-1 transition active:scale-95 hover:bg-surface-container-high">
                <Bookmark
                    size={22} onClick={onSave}
                    className={
                        isSaved
                            ? "fill-primary text-primary"
                            : "text-on-surface-variant hover:text-primary"
                    }
                />
            </button>
        </div>
    );
}