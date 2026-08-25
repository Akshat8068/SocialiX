"use client";

import { useGetUserProfileQuery } from "@/features/profile/api/profile.api";
import ProfilePage from "./ProfilePage";
import { useGetUserPostsQuery } from "@/features/post/api/post.api";
import { useAppSelector } from "@/store/hooks";

interface Props {
  userId: number;
}

export default function UserProfile({ userId }: Props) {
  const { data, isLoading, isError } = useGetUserProfileQuery(userId);
  const {data:postsData,isLoading:postLoading,isError:postError}=useGetUserPostsQuery({userId:userId})
  
  const user = data?.data.user;
  const isFollowing = data?.data.isFollowing;
  const posts = postsData?.data ?? [];
  const currentUser = useAppSelector((state) => state.auth.user);
  const isOwnProfile = currentUser?.id === user?.id;
  return (
    <ProfilePage
      user={user}
      posts={posts}
      isOwnProfile={isOwnProfile}
      isFollowing={isFollowing}
      isLoading={isLoading}
      isError={isError}
    />
  );
}