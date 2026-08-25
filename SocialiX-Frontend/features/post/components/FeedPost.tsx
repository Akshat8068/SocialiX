"use client";

import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostActions from "./PostActions";
import PostCaption from "./PostCaption";
import PostComments from "./PostComments";
import AddComment from "./AddComment";
import { useState } from "react";
import dynamic from "next/dynamic";

const UserListModel = dynamic(() => import("@/components/UserListModel/UserListModel"), {
    loading: () => null,
})
import { Post } from "@/types/post";
import { useDeletePostMutation } from "../api/post.api";
import { toast } from "react-toastify";
import { useGetLikedUsersQuery, useToggleLikeMutation } from "@/features/likeAndComment/api/like.api";
import { useCreateCommentMutation, useGetPostCommentsQuery } from "@/features/likeAndComment/api/comment.api";

import CommentModel from "./CommentModel";
import { useAppSelector } from "@/store/hooks";
import { useGetSingleSavedQuery, useSavePostMutation } from "../api/saved.api";

interface FeedPostProps {
    post: Post
}

export default function FeedPost({ post }: FeedPostProps) {

    const [search, setSearch] = useState("")
    const [isLiked, setIsLiked] = useState(post.isLiked)
    const [likeCount, setLikeCount] = useState(post.likeCount)
    const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()
    const [toggleLike] = useToggleLikeMutation()
    const handleLike = async () => {
        // Optimistic local update
        const wasLiked = isLiked
        setIsLiked(!wasLiked)
        setLikeCount((c) => c + (!wasLiked ? 1 : -1))

        try {
            const res = await toggleLike({ postId: post.id }).unwrap();
            toast.success(res.message);
        } catch {
            // Revert on failure
            setIsLiked(wasLiked)
            setLikeCount((c) => c + (wasLiked ? 1 : -1))
            toast.error("Something went wrong");
        }
    }
    const handleDelete = async () => {
        try {
            await deletePost({ postId: post.id }).unwrap();
            toast.success("Post deleted successfully");
        } catch (error) {
            toast.error("Failed to delete post");
        }
    }
    const { data: commentsData } = useGetPostCommentsQuery({
        postId: post.id
    }, {
        pollingInterval: 5000,
        skipPollingIfUnfocused: true,
    });

    const comments = commentsData?.data ?? []
    const [showAllComments, setShowAllComments] = useState(false);
    const [createComment] = useCreateCommentMutation()

    const handleComment = async (content: string) => {
        try {
            await createComment({
                postId: post.id,
                content,
            }).unwrap();

            toast.success("Comment added");
        } catch {
            toast.error("Failed to add comment");
        }
    };
    const [openLikes, setOpenLikes] = useState(false)

    const { data: likedUsersData, isLoading: likedUsersLoading, } = useGetLikedUsersQuery({
        postId: post.id,
    }, {
        pollingInterval: 10000,
        skipPollingIfUnfocused: true,
    })
    const likedUsers = likedUsersData?.data.map(({ user }) => ({
        id: user.id,
        fullName: user.fullname,
        username: user.username,
        profilePicture: user.profilePicture,
        isVerified: user.isVerified,
        isFollowing: user.isFollowing,
    })) ?? []
    const currentUser = useAppSelector((state) => state.auth.user)
    const isOwnPost = currentUser?.id === post.user.id
    const { data: savedData, } = useGetSingleSavedQuery({
        postId: post.id,
    })
    const [savePost] = useSavePostMutation()
    const handleSave = async () => {
        try {
            const res = await savePost({
                postId: post.id,
            }).unwrap();

            toast.success(res.message);
        } catch {
            toast.error("Failed to save post");
        }
    };
    return (
        <article className="mb-8  overflow-hidden rounded-xl  bg-primary/8 shadow-2xl ">
            <PostHeader
                fullname={post.user.fullname}
                username={post.user.username}
                isOwnPost={isOwnPost}
                profilePicture={post.user.profilePicture ?? undefined}
                verified={post.user.isVerified}
                createdAt={post.createdAt}
                id={post.user.id}
                onDelete={handleDelete}
            />

            <PostMedia
                image={post.media[0]?.secureUrl}
                alt={post.caption ?? ""}
            />

            <PostActions
                likes={likeCount}
                isLiked={isLiked}
                comments={post.commentCount}
                shares={0}
                isSaved={!!savedData?.data}
                onLikesClick={() => setOpenLikes(true)}
                onLike={handleLike}
                onSave={handleSave}
                onCommentsClick={() => setShowAllComments(true)}
            />


            <PostCaption
                username={post.user.username}
                caption={post.caption ?? ""}
                hashtags={post.hashtags ?? []}
            />

            <PostComments
                comments={comments}
                totalComments={comments.length}
                onViewAll={() => setShowAllComments(true)}
            />

            <AddComment
                profilePicture={post.user.profilePicture ?? "/Hero.jpg"}
                onSubmit={handleComment}
            />
            <UserListModel
                open={openLikes}
                onClose={() => setOpenLikes(false)}
                title="Likes"
                type="likes"
                count={likedUsers.length}
                users={likedUsers}
                loading={likedUsersLoading}
                search={search}
                onSearchChange={setSearch}
                onFollow={(id) => { }}
                onUnfollow={(id) => { }}
                onMessage={(id) => { }}
            />
            {showAllComments && (
                <CommentModel
                    comments={comments}
                    onClose={() => setShowAllComments(false)}
                    profilePicture={currentUser?.profilePicture ?? "/Hero.jpg"}
                    onAddComment={handleComment}
                />
            )}
        </article>
    );
}