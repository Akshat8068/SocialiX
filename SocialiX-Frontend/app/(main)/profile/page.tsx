"use client";

import { useGetProfileQuery } from "@/features/profile/api/profile.api";
import ProfilePage from "@/features/profile/components/ProfilePage";

export default function Profile() {
  const { data, isLoading, isError } = useGetProfileQuery()
  
  return (
    <>
      <ProfilePage
        user={data?.data}
        posts={data?.data?.post ?? []}
        isOwnProfile={true}
        isFollowing={false}
        isLoading={isLoading}
        isError={isError}
      />
      </>
  )
}