
"use client";

import Image from "next/image";
import Link from "next/link";
import { FollowUser, UserListType } from "./UserListModel";
import UserRequestActions from "./UserRequestActions";
import UserActions from "./UserActions";

interface FollowUserCardProps {
  type: UserListType;
  user: FollowUser;
  isOwnProfile: boolean;
  onFollow?: (id: number) => void;
  onUnfollow?: (id: number) => void;
  onRemoveFollower?: (id: number) => void;
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  onMessage?: (id: number) => void;
}

export default function UserCard({
  type,
  user,
  onFollow,
  onRemoveFollower,
  onUnfollow,
  onAccept,
  onReject,
  onMessage,
  isOwnProfile,
}: FollowUserCardProps) {
  return (
    <div className="flex items-center gap-3 px-5 py-3">

      {/* Avatar */}
      <Link
        href={`/user/${user.id}`}
        className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full"
      >
        <Image
          src={user.profilePicture || "/Hero.jpg"}
          alt={user.fullName}
          fill
          sizes="48px"
          className="object-cover"
        />
      </Link>

      {/* User Info */}
      <div className="min-w-0 flex-1 ">
        <div className="flex items-center gap-1">
          <Link href={`/user/${user.id}`}>
            <p className="truncate text-sm font-semibold ">
              {user.fullName}
            </p>
          </Link>
        </div>

        <p className="truncate text-sm ">
          @{user.username}
        </p>

        {user.followsYou && (
          <p className="mt-0.5 text-xs ">
            Follows you
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="ml-2 flex shrink-0 items-center">
        {type === "requests" ? (
          <UserRequestActions
            user={user}
            onAccept={onAccept}
            onReject={onReject}
          />
        ) : (
          <UserActions
            user={user}
            type={type}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            onMessage={onMessage}
            onRemoveFollower={onRemoveFollower}
            isOwnProfile={isOwnProfile}
          />
        )}
      </div>
    </div>
  );
}