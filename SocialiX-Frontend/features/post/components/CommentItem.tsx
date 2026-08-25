"use client";

import { User } from "@/types/auth";
import { Comment } from "@/types/likeandComment";
import { Check, MoreHorizontal, Pencil, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface Props {
    comment: Comment;
    currentUser: User | null;

    editingId: number | null;
    editedContent: string;
    setEditedContent: (v: string) => void;
    setEditingId: (v: number | null) => void;

    replyingId: number | null;
    replyContent: string;
    setReplyContent: (v: string) => void;
    setReplyingId: (v: number | null) => void;

    handleReply: (id: number) => void;
    handleDelete: (id: number) => void;
    handleEdit: (comment: Comment) => void;
    handleUpdate: () => void;
}

export default function CommentItem({
    comment,
    currentUser,
    editingId,
    editedContent,
    setEditedContent,
    setEditingId,
    replyingId,
    replyContent,
    setReplyContent,
    setReplyingId,
    handleReply,
    handleDelete,
    handleEdit,
    handleUpdate,
}: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const isOwn = comment.user.id === currentUser?.id;
    const isEditing = editingId === comment.id;
    const isReplying = replyingId === comment.id;
    const replyCount = comment.replies?.length ?? 0;

    return (
        <div className="mt-4">
            <div className="flex items-start gap-3">
                {/* Avatar */}
                <Image
                    src={comment.user.profilePicture || "/Hero.jpg"}
                    alt={comment.user.username}
                    width={32}
                    height={32}
                    className="rounded-full object-cover shrink-0 mt-0.5"
                />

                {/* Body */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        {/* Username + content */}
                        <div className="flex-1 min-w-0">
                            <span
                                className="font-semibold text-sm mr-1"
                                style={{ color: "var(--theme-on-surface)" }}
                            >
                                {comment.user.username}
                            </span>

                            {isEditing ? (
                                <div className="mt-1 flex gap-2">
                                    <input
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        className="flex-1 rounded-full px-3 py-1 text-sm outline-none"
                                        style={{
                                            border: "1px solid var(--theme-outline)",
                                            backgroundColor: "var(--theme-input)",
                                            color: "var(--theme-on-surface)",
                                        }}
                                    />
                                    <button onClick={handleUpdate}>
                                        <Check size={17} className="text-green-500" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingId(null);
                                            setEditedContent("");
                                        }}
                                    >
                                        <X size={17} style={{ color: "var(--theme-on-surface-variant)" }} />
                                    </button>
                                </div>
                            ) : (
                                <span
                                    className="text-sm break-words"
                                    style={{ color: "var(--theme-on-surface)" }}
                                >
                                    {comment.content}
                                </span>
                            )}

                            {/* Reply button */}
                            {!isEditing && (
                                <button
                                    onClick={() => setReplyingId(isReplying ? null : comment.id)}
                                    className="mt-1 block text-xs font-medium transition-colors"
                                    style={{ color: "var(--theme-on-surface-variant)" }}
                                >
                                    Reply
                                </button>
                            )}
                        </div>

                        {/* 3-dot menu — own comments only */}
                        {isOwn && !isEditing && (
                            <div className="relative shrink-0" ref={menuRef}>
                                <button
                                    onClick={() => setMenuOpen((p) => !p)}
                                    className="p-1 rounded-full transition-colors"
                                    aria-label="Comment options"
                                    style={{ color: "var(--theme-on-surface-variant)" }}
                                >
                                    <MoreHorizontal size={18} />
                                </button>

                                {menuOpen && (
                                    <>
                                        {/* Click-away backdrop */}
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setMenuOpen(false)}
                                        />
                                        <div
                                            className="absolute right-0 z-20 mt-1 w-32 rounded-lg shadow-lg overflow-hidden"
                                            style={{
                                                backgroundColor: "var(--theme-surface-container-lowest)",
                                                border: "1px solid var(--theme-outline-variant)",
                                            }}
                                        >
                                            <button
                                                onClick={() => {
                                                    handleEdit(comment);
                                                    setMenuOpen(false);
                                                }}
                                                className="flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors"
                                                style={{
                                                    color: "var(--theme-on-surface)",
                                                    backgroundColor: "transparent",
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.backgroundColor =
                                                        "var(--theme-hover)")
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.backgroundColor =
                                                        "transparent")
                                                }
                                            >
                                                <Pencil size={14} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDelete(comment.id);
                                                    setMenuOpen(false);
                                                }}
                                                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 transition-colors"
                                                style={{ backgroundColor: "transparent" }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.backgroundColor =
                                                        "var(--theme-hover)")
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.backgroundColor =
                                                        "transparent")
                                                }
                                            >
                                                <Trash2 size={14} />
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Reply input */}
                    {isReplying && (
                        <div className="mt-2 flex gap-2">
                            <input
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="flex-1 rounded-full px-3 py-1 text-sm outline-none"
                                placeholder="Write a reply..."
                                style={{
                                    border: "1px solid var(--theme-outline)",
                                    backgroundColor: "var(--theme-input)",
                                    color: "var(--theme-on-surface)",
                                }}
                            />
                            <button
                                onClick={() => handleReply(comment.id)}
                                className="text-sm font-semibold transition-opacity hover:opacity-80"
                                style={{ color: "var(--theme-primary)" }}
                            >
                                Send
                            </button>
                        </div>
                    )}

                    {/* Nested replies toggle */}
                    {replyCount > 0 && (
                        <button
                            onClick={() => setShowReplies((p) => !p)}
                            className="mt-2 flex items-center gap-1 text-xs font-medium transition-colors"
                            style={{ color: "var(--theme-on-surface-variant)" }}
                        >
                            <span
                                className="inline-block w-6 border-t"
                                style={{ borderColor: "var(--theme-outline-variant)" }}
                            />
                            {showReplies
                                ? "Hide replies"
                                : `View ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
                        </button>
                    )}
                </div>
            </div>

            {/* Nested replies */}
            {showReplies && replyCount > 0 && (
                <div
                    className="ml-11 mt-2 space-y-1 border-l pl-4"
                    style={{ borderColor: "var(--theme-outline-variant)" }}
                >
                    {comment.replies.map((reply: Comment) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            currentUser={currentUser}
                            editingId={editingId}
                            editedContent={editedContent}
                            setEditedContent={setEditedContent}
                            setEditingId={setEditingId}
                            replyingId={replyingId}
                            replyContent={replyContent}
                            setReplyContent={setReplyContent}
                            setReplyingId={setReplyingId}
                            handleReply={handleReply}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            handleUpdate={handleUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
