"use client";

import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import type { ConversationResponse } from "@/types/chat";

interface ConversationItemProps {
  conversation: ConversationResponse;
  active?: boolean;
  onClick: () => void;
}

const ConversationItem = ({
  conversation,
  active = false,
  onClick,
}: ConversationItemProps) => {
  const currentUser = useAppSelector((state) => state.auth.user);

  const otherUser = conversation.conversation.participants.find(
    (participant) => participant.user.id !== currentUser?.id
  )?.user;

  const avatar = otherUser?.profilePicture || "/Hero.jpg";
  const name = otherUser?.username ?? "Unknown User";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        px-4
        py-3
        flex
        items-center
        gap-3
        text-left
        transition-colors
        border-l-4
        ${active
          ? "border-primary bg-surface-container-low"
          : "border-transparent hover:bg-surface-container-lowest"
        }
      `}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        {avatar ? (
          <Image
            src={avatar || "/Hero.jpg"}
            alt={name}
            width={52}
            height={52}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-13 w-13 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            {name.toUpperCase()}
          </div>
        )}
      </div>

      {/* Content */}
      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between">
          <h3
            className={`truncate ${active ? "font-semibold" : "font-medium"
              }`}
          >
            {name}
          </h3>

          <span className="ml-3 shrink-0 text-xs text-on-surface-variant">
            {conversation.conversation.lastMessageAt
              ? new Date(
                conversation.conversation.lastMessageAt
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
              : ""}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <p
            className={`min-w-0 flex-1 truncate text-sm ${conversation.unreadCount > 0
                ? "font-semibold text-on-surface"
                : "text-on-surface-variant"
              }`}
          >
            {conversation.conversation.lastMessage ||
              "Start a conversation"}
          </p>

          {conversation.unreadCount > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-on-primary">
              {conversation.unreadCount > 99
                ? "99+"
                : conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;