"use client";

import {
    useDeleteCommentMutation,
    useReplyCommentMutation,
    useUpdateCommentMutation,
} from "@/features/likeAndComment/api/comment.api";

import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import CommentItem from "./CommentItem";
import { Comment } from "@/types/likeandComment";
import EmptyState from "@/components/common/EmptyState";
import AddComment from "./AddComment";
import { ArrowLeft, X } from "lucide-react";

interface CommentModelProps {
    comments: Comment[];
    onClose: () => void;
    profilePicture: string;
    onAddComment: (content: string) => void;
}

export default function CommentModel({
    comments,
    onClose,
    profilePicture,
    onAddComment,
}: CommentModelProps) {
    const currentUser = useAppSelector((state) => state.auth.user);

    const [deleteComment] = useDeleteCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const [replyComment] = useReplyCommentMutation();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedContent, setEditedContent] = useState("");
    const [replyingId, setReplyingId] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState("");

    const handleDelete = async (commentId: number) => {
        try {
            await deleteComment({ commentId }).unwrap();
            toast.success("Comment deleted");
        } catch {
            toast.error("Failed to delete comment");
        }
    };

    const handleEdit = (comment: Comment) => {
        setEditingId(comment.id);
        setEditedContent(comment.content);
    };

    const handleUpdate = async () => {
        if (!editingId) return;
        try {
            await updateComment({
                commentId: editingId,
                content: editedContent,
            }).unwrap();
            toast.success("Comment updated");
            setEditingId(null);
            setEditedContent("");
        } catch {
            toast.error("Failed to update");
        }
    };

    const handleReply = async (commentId: number) => {
        if (!replyContent.trim()) return;
        try {
            await replyComment({ commentId, content: replyContent }).unwrap();
            toast.success("Reply added");
            setReplyingId(null);
            setReplyContent("");
        } catch {
            toast.error("Failed to reply");
        }
    };

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-end justify-center md:items-center"
            style={{ backgroundColor: "var(--theme-overlay)" }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            {/* Panel */}
            <div
                className="animate-modal flex h-[90vh] w-full flex-col rounded-t-2xl md:h-[80vh] md:w-[500px] md:rounded-xl"
                style={{
                    backgroundColor: "var(--theme-surface-container-lowest)",
                    color: "var(--theme-on-surface)",
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: "1px solid var(--theme-outline-variant)" }}
                >
                    {/* Back arrow — mobile only */}
                    <button
                        onClick={onClose}
                        className="md:hidden"
                        aria-label="Close"
                        style={{ color: "var(--theme-on-surface-variant)" }}
                    >
                        <ArrowLeft size={22} />
                    </button>

                    <h2 className="flex-1 text-center text-base font-semibold md:text-left md:flex-none">
                        Comments
                    </h2>

                    {/* X — desktop only */}
                    <button
                        onClick={onClose}
                        className="hidden md:block"
                        aria-label="Close"
                        style={{ color: "var(--theme-on-surface-variant)" }}
                    >
                        <X size={20} />
                    </button>

                    {/* Spacer to keep title centred on mobile */}
                    <div className="w-6 md:hidden" />
                </div>

                {/* Scrollable comment list */}
                <div className="flex-1 overflow-y-auto px-4 py-2">
                    {comments.length === 0 ? (
                        <EmptyState variant="comments" />
                    ) : (
                        comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
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
                        ))
                    )}
                </div>

                {/* Add comment — pinned at bottom */}
                <div style={{ borderTop: "1px solid var(--theme-outline-variant)" }}>
                    <AddComment
                        profilePicture={profilePicture}
                        onSubmit={onAddComment}
                    />
                </div>
            </div>
        </div>
    );
}
