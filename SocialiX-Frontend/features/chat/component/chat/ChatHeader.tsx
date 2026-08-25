"use client";

import Image from "next/image";
import {
  ArrowLeft,
  Info,
  Phone,
  Video,
} from "lucide-react";

import { useAppSelector } from "@/store/hooks";
import type { ConversationResponse } from "@/types/chat";
import Link from "next/link";

interface ChatHeaderProps {
  conversation: ConversationResponse;
  isOnline: boolean;
  onBack?: () => void;
}

const ChatHeader = ({
  conversation,
  onBack,
  isOnline,
}: ChatHeaderProps) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  const otherUser = conversation.conversation.participants.find(
    (participant) => participant.user.id !== currentUser?.id
  )?.user;

  const avatar = otherUser?.profilePicture || "/Hero.jpg";
  const name = otherUser?.username ?? "Unknown User";

  return (
    <header className="flex h-16 items-center justify-between border-b border-outline-variant/30 bg-surface px-4 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Back */}
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-2 transition-colors hover:bg-surface-container md:hidden"
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Avatar */}
        <div className="relative shrink-0">
          {avatar ? (
            <Link href={`/user/${otherUser?.id}`} >
            <Image
              src={avatar || "/Hero.jpg"}
              alt={name}
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
            </Link>
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {name.toUpperCase()}
            </div>
          )}
        </div>

        {/* Name */}
        <div className="min-w-0">
          <Link href={`/user/${otherUser?.id}`} >
          <h2 className="truncate text-base font-semibold text-on-surface">
            {name}
          </h2>
          </Link>

          <p className="text-xs text-on-surface-variant">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="rounded-full p-2 transition-colors hover:bg-surface-container"
          aria-label="Voice Call"
        >
          <Phone size={20} />
        </button>

        <button
          type="button"
          className="rounded-full p-2 transition-colors hover:bg-surface-container"
          aria-label="Video Call"
        >
          <Video size={20} />
        </button>

        <button
          type="button"
          className="rounded-full p-2 transition-colors hover:bg-surface-container"
          aria-label="Conversation Info"
        >
          <Info size={20} />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;