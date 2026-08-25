"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/types/auth";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function UserCard({ user }: { user: User }) {
  return (
    <Link href={`/user/${user.id}`}>
      <div
        className="
          rounded-2xl
          border
          border-outline-variant/40
          bg-primary/8
          p-4
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-lg

          flex
          items-center
          justify-between
          gap-3

          md:flex-col
          md:justify-center
          md:items-center
          md:text-center
          md:p-6
        "
      >
        {/* User Info */}
        <div
          className="
            flex
            items-center
            gap-3
            flex-1

            md:flex-col
            md:flex-none
            md:gap-4
          "
        >
          <Image
            src={user.profilePicture || "/Hero.jpg"}
            alt={user.fullname}
            width={80}
            height={80}
            className="
              h-14
              w-14
              rounded-full
              object-cover
              shrink-0

              md:h-20
              md:w-20
            "
          />

          <div className="min-w-0 md:text-center">
            <h3 className="truncate text-base font-semibold md:text-lg">
              {user.fullname}
            </h3>

            <p className="truncate text-sm text-muted-foreground">
              @{user.username}
            </p>

            {user.bio && (
              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        {/* Button */}
        <Button
          className="
            shrink-0
p-2
            md:mt-5
            md:w-full
          "
          rightIcon={<Eye size={16} />}
        >
          View Profile
        </Button>
      </div>
    </Link>
  );
}