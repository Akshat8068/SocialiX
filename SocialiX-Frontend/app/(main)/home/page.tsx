"use client";

import { useGetHomeFeedQuery } from "@/features/post/api/post.api";
import ProfileFeedView from "@/features/profile/components/ProfileFeedView";


export default function HomeFeed() {
  const { data, isLoading, isError, error } = useGetHomeFeedQuery(undefined, {
    pollingInterval: 30000,
    skipPollingIfUnfocused: true,
  })

  if (isLoading) {
    return <div className="text-center flex font-semibold justify-center min-h-screen items-center">Socialix</div>;
  }

  if (isError) {
    return <div>Something went wrong.</div>;
  }

  return (
    <main className="min-h-screen mx-4 md:mx-20  ">
      <ProfileFeedView posts={data?.data ?? []} />
    </main>
  );
}