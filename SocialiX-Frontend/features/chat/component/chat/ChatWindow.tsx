"use client";
// app/messages/components/ChatWindow/ChatWindow.tsx


import { ConversationResponse, Message, TypingPayload } from "@/types/chat";

import MessageList from "./ MessageList";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import EmptyState from "@/components/common/EmptyState";


interface ChatWindowProps {
  conversation: ConversationResponse | null;
  messages: Message[];
  currentUserId: number;
  isTyping?: boolean;

  typingStart: (payload: TypingPayload) => void;
  typingStop: (payload: TypingPayload) => void;
  onDeleteMessage: (messageId: number) => void;
  onBack?: () => void;
  onSendMessage: (message: string) => void;
  className?: string;
  isOnline: boolean
}

const ChatWindow = ({
  conversation,
  messages,
  currentUserId,
  isOnline,
  isTyping = false,
  typingStart,
  typingStop,
  onBack,
  onSendMessage,
  onDeleteMessage,
  className = "",
}: ChatWindowProps) => {
  if (!conversation) {
    return (
      <section
        className={`flex-1 items-center justify-center bg-surface-container-lowest hidden md:flex ${className}`}
      >
        <EmptyState variant="chat" />
      </section>
    );
  }

  return (
    <section
      className={`
        flex
        flex-1
        flex-col
        pb-20 md:pb-2
        bg-surface-container-lowest
        ${className}
      `}
    >
      <ChatHeader
        conversation={conversation}
        onBack={onBack}
        isOnline={isOnline}
      />

      <MessageList
        messages={messages}
        currentUserId={currentUserId}
        isTyping={isTyping}
        conversation={conversation}
        onDeleteMessage={onDeleteMessage}
      />

      <MessageInput
        conversationId={Number(conversation.conversation.id)}
        onSend={onSendMessage}
        typingStart={typingStart}
        typingStop={typingStop}
      />
    </section>
  );
};

export default ChatWindow;