"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  CheckCheck,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Message } from "@/types/chat";


interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  onDelete: (messageId: number) => void;
}

const MessageBubble = ({
  message,
  isOwnMessage,
  onDelete,
}: MessageBubbleProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [])

  return (
    <div
      className={`flex ${isOwnMessage
        ? "justify-end"
        : "justify-start"
        }`}
    >
      <div
        className={`flex items-start gap-2 max-w-[85%] md:max-w-[70%] ${isOwnMessage
          ? "flex-row-reverse"
          : "flex-row"
          }`}
      >
        {/* Menu (Only Own Messages) */}
        {isOwnMessage && (
          <div
            ref={menuRef}
            className="relative"
          >
            <button
              onClick={() =>
                setShowMenu((prev) => !prev)
              }
              className="rounded-lg p-1 text-on-surface-variant transition hover:bg-surface-container"
            >
              <MoreVertical size={18} />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-8 z-50 w-52 overflow-hidden rounded-xl border border-outline-variant/30 bg-surface shadow-lg">
                <button
                  onClick={() => {
                    onDelete(Number(message.id));
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-error transition hover:bg-surface-container"
                >
                  <Trash2 size={18} />
                  Delete for Everyone
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bubble */}
        <div
          className={`flex flex-col gap-1 ${isOwnMessage
            ? "items-end"
            : "items-start"
            }`}
        >
          <div
            className={`rounded-2xl px-4 py-3 shadow-sm ${isOwnMessage
              ? "rounded-br-md bg-primary text-on-primary"
              : "rounded-bl-md bg-surface-container text-on-surface"
              }`}
          >
            <p className="whitespace-pre-wrap text-sm leading-6 md:text-base">
              {message.content}
            </p>
          </div>

          <div
            className={`flex items-center gap-1 px-1 text-xs text-on-surface-variant ${isOwnMessage
              ? "justify-end"
              : "justify-start"
              }`}
          >
            
            <span>
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageBubble;