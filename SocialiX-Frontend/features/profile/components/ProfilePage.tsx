"use client";

import ProfileFeedView from "@/features/profile/components/ProfileFeedView";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileTabs from "@/features/profile/components/ProfileTabs";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { User } from "@/types/auth";
import { Post } from "@/types/post";
import { useGetFollowersQuery, useGetFollowingQuery, useRemoveFollowerMutation, useUnFollowUserMutation } from "@/features/follow/api/follow.api";
import dynamic from "next/dynamic";
import { useGetAllSavedQuery } from "@/features/post/api/saved.api";
import { ArrowBigLeft, MoveLeft } from "lucide-react";

const UserListModel = dynamic(() => import("@/components/UserListModel/UserListModel"), {
    loading: () => null,
});

interface ProfilePageProps {
    user?: User
    isLoading: boolean
    isOwnProfile: boolean;
    isError: boolean
    posts?: Post[]
    isFollowing?: boolean;
}
export default function ProfilePage({ user, isLoading, isError, posts, isOwnProfile, isFollowing }: ProfilePageProps) {
    const [showFeed, setShowFeed] = useState(false)
    const [selectedPosts, setSelectedPosts] = useState<Post[] | null>(null)
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<"followers" | "following">("followers")
    const openFollowers = () => {
        setModalType("followers");
        setOpenModal(true);
    }

    const openFollowing = () => {
        setModalType("following");
        setOpenModal(true);
    }

    const userId = user?.id
    const { data: followersData } = useGetFollowersQuery(
        { userId: userId! },
        {
            skip: !userId,
        }
    );
    const [unFollowUser] = useUnFollowUserMutation();
    const [removeFollower] = useRemoveFollowerMutation()
    const { data: followingData } = useGetFollowingQuery(
        { userId: userId! },
        {
            skip: !userId,
        }
    )
    const userPosts = posts ?? user?.post ?? []

    const postCount = userPosts.length;
    const followerUsers =
        followersData?.data.map((item) => ({
            id: item.follower.id,
            fullName: item.follower.fullname,
            username: item.follower.username,
            profilePicture: item.follower.profilePicture,
            isVerified: item.follower.isVerified,
            isFollowing: false,
        })) ?? [];
    const followingUsers =
        followingData?.data.map((item) => ({
            id: item.following.id,
            fullName: item.following.fullname,
            username: item.following.username,
            profilePicture: item.following.profilePicture,
            isVerified: item.following.isVerified,
            isFollowing: false,
        })) ?? []
    const { data: savedData, isLoading: savedLoading } = useGetAllSavedQuery(undefined, {
        skip: !isOwnProfile,
    })
    const savedPosts =
        savedData?.data.map((saved) => saved.post) ?? []

    if (isLoading) {
        return <div className="text-center min-h-screen flex font-semibold justify-center items-center">Socialix...</div>;
    }

    if (isError) {
        return <div>Something went wrong.</div>;
    }
    if (!user) {
        return <div className="text-center min-h-screen flex  font-semibold justify-center items-center">Socialix...</div>;
    }
    return (
        <>
            <div className=" w-full md:text-xl md:tracking-[0.5px] lg:text-3xl px-2 md:mx-10 lg:mx-0 py-5">
                <ProfileHeader
                    user={user}
                    postCount={postCount}
                    isOwnProfile={isOwnProfile}
                    isFollowing={isFollowing}
                    followerCount={followersData?.count ?? 0}
                    followingCount={followingData?.count ?? 0}
                    onFollowersClick={openFollowers}
                    onFollowingClick={openFollowing}
                />
                {selectedPosts ? (
                    <>
                        <button
                            onClick={() => setSelectedPosts(null)}
                            className="mb-4 px-4 py-2"
                        >
                            <MoveLeft size={22}/>
                        </button>
                        


                        <ProfileFeedView posts={selectedPosts} />
                    </>
                ) : (
                    <ProfileTabs
                     posts={userPosts}
                    savedPosts={savedPosts} 
                    isOwnProfile={isOwnProfile} 
                    onPostClick={(posts) => setSelectedPosts(posts)} />
                )}
               
            </div>
            <UserListModel
                open={openModal}
                onClose={() => setOpenModal(false)}
                type={modalType}
                isOwnProfile={isOwnProfile}
                onRemoveFollower={
                    isOwnProfile
                        ? (id) => removeFollower({ userId: id })
                        : undefined
                }
                onUnfollow={
                    isOwnProfile
                        ? (id) => unFollowUser({ userId: id })
                        : undefined
                }
                title={modalType === "followers" ? "Followers" : "Following"}
                count={
                    modalType === "followers"
                        ? followersData?.count ?? 0
                        : followingData?.count ?? 0
                }
                users={
                    modalType === "followers"
                        ? followerUsers
                        : followingUsers
                }
                loading={false}
                search=""
                onSearchChange={() => { }}
            />
        </>
    )
}