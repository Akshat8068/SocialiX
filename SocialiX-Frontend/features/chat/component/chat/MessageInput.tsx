// app/messages/components/ChatWindow/MessageInput.tsx

"use client";

import { useState, useRef, KeyboardEvent } from "react";
import {
  Image,
  Paperclip,
  SendHorizontal,
  Smile,
} from "lucide-react";
import { TypingPayload } from "@/types/chat";

interface MessageInputProps {
  conversationId: number;
  onSend: (message: string) => void;
  typingStart: (payload: TypingPayload) => void;
  typingStop: (payload: TypingPayload) => void;

  disabled?: boolean;

  placeholder?: string;
}

const MessageInput = ({
  conversationId,
  onSend,
  typingStart,
  typingStop,
  disabled = false,
  placeholder = "Type a message...",
}: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const typingTimeout = useRef<NodeJS.Timeout | null>(null)
  const handleSend = () => {
    const text = message.trim();

    if (!text || disabled) return;

    onSend(text);
    setMessage("");
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    // Send on Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <footer className="border-t border-outline-variant/30 bg-surface px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-4xl items-end gap-3">
        {/* Left Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container"
            aria-label="Attach File"
          >
            <Paperclip size={20} />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container"
            aria-label="Upload Image"
          >
            <Image size={20} />
          </button>

          <button
            type="button"
            className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container"
            aria-label="Emoji"
          >
            <Smile size={20} />
          </button>
        </div>

        {/* Input */}
        <div className="flex-1">
          <textarea
            rows={1}
            value={message}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => {
              setMessage(e.target.value);

              typingStart({
                conversationId,
              });

              if (typingTimeout.current) {
                clearTimeout(typingTimeout.current);
              }

              typingTimeout.current = setTimeout(() => {
                typingStop({
                  conversationId,
                });
              }, 500);
            }}
            onKeyDown={handleKeyDown}
            className="max-h-40 min-h-[48px] w-full resize-none rounded-2xl border border-outline-variant/40 bg-surface-container px-4 py-3 text-sm text-on-surface outline-none transition-all placeholder:text-on-surface-variant focus:border-primary md:text-base"
          />
        </div>

        {/* Send */}
        <button
          type="button"
          disabled={!message.trim() || disabled}
          onClick={handleSend}
          aria-label="Send Message"
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-on-primary transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </footer>
  );
};

export default MessageInput;