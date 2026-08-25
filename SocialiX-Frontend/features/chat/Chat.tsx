"use client";
// app/messages/page.tsx


import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ConversationList from "./component/converstaionList/ConversationList";
import ChatWindow from "./component/chat/ChatWindow";
import { ConversationFilter } from "./component/converstaionList/ConversationFilters";
import { chatApi, useGetConversationMessagesQuery, useGetConversationsQuery } from "./api/chat.api";
import useChatSocket from "./hooks/useChatSocket";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ConversationResponse } from "@/types/chat";




export default function ChatPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user)
  const currentUserId = user!.id
  const searchParams = useSearchParams();
  const { data, isLoading, isError, } = useGetConversationsQuery(undefined, { pollingInterval: 60000, skipPollingIfUnfocused: true });

  const [isTyping, setIsTyping] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState<Set<number>>(new Set())
  const {
    joinConversation,
    sendMessage,
    typingStart,
    typingStop,
    markSeen,
    deleteForEveryone,

  } = useChatSocket({
    onNewMessage: (message) => {
      const conversationId = Number(message.conversationId);

      const isCurrentConversation =
        selectedConversation?.conversation.id === conversationId;

      const isReceivedMessage =
        message.sender.id !== currentUserId;

      console.log("NEW MESSAGE:", {
        conversationId,
        senderId: message.sender.id,
        currentUserId,
        selectedConversationId:
          selectedConversation?.conversation.id,
        isCurrentConversation,
        isReceivedMessage,
      });

      // --------------------------------
      // 1. Update messages cache
      // --------------------------------
      dispatch(
        chatApi.util.updateQueryData(
          "getConversationMessages",
          conversationId,
          (draft) => {
            if (!draft?.data) return;

            const alreadyExists = draft.data.some(
              (msg) => msg.id === message.id
            );

            if (!alreadyExists) {
              draft.data.push(message);
            }
          }
        )
      );

      // --------------------------------
      // 2. Update conversations cache
      // --------------------------------
      dispatch(
        chatApi.util.updateQueryData(
          "getConversations",
          undefined,
          (draft) => {
            if (!draft?.data) return;

            const conversation = draft.data.find(
              (c) =>
                Number(c.conversation.id) === conversationId
            );

            if (!conversation) {
              console.log(
                "Conversation not found:",
                conversationId
              );
              return;
            }

            // Always update last message
            conversation.conversation.lastMessage =
              message.content;

            conversation.conversation.lastMessageAt =
              message.createdAt;

            // --------------------------------
            // IMPORTANT
            // --------------------------------
            // Only increase unread count when:
            //
            // 1. Message is from another user
            // 2. Conversation is NOT currently open
            //
            if (
              isReceivedMessage &&
              !isCurrentConversation
            ) {
              conversation.unreadCount =
                (conversation.unreadCount ?? 0) + 1;
            }

            // If conversation is currently open,
            // keep unread count at 0.
            if (
              isReceivedMessage &&
              isCurrentConversation
            ) {
              conversation.unreadCount = 0;
            }

            console.log(
              "UPDATED CONVERSATION:",
              conversation.conversation.id,
              "unread:",
              conversation.unreadCount
            );

            // Move latest conversation to top
            draft.data.sort(
              (a, b) =>
                new Date(
                  b.conversation.lastMessageAt ?? 0
                ).getTime() -
                new Date(
                  a.conversation.lastMessageAt ?? 0
                ).getTime()
            );
          }
        )
      );
    },

    onTyping: (payload) => {
      console.log("Typing event", payload)
      setIsTyping(payload.isTyping);
    },
    onUserOnline: ({ userId }) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.add(userId);
        return next;
      });
    },

    onUserOffline: ({ userId }) => {
      setOnlineUsers((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    },
    onConversationSeen: (payload) => {
      dispatch(
        chatApi.util.updateQueryData(
          "getConversationMessages",
          Number(payload.conversationId),
          (draft) => {
            if (!draft?.data) return;

            draft.data.forEach((message) => {
              if (
                message.sender.id === currentUserId &&
                !message.seenAt
              ) {
                message.seenAt = payload.seenAt;
              }
            });
          }
        )
      );
    },
    onMessageDeleted: ({
      messageId,
      conversationId,
    }) => {
      dispatch(
        chatApi.util.updateQueryData(
          "getConversationMessages",
          Number(conversationId),
          (draft) => {
            if (!draft?.data) return;
            draft.data = draft.data.filter(
              (m) => m.id !== messageId
            );
          }
        )
      );
    },
  });

  const conversations = data?.data ?? []
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationResponse | null>(null)
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)
  const [filter, setFilter] = useState<ConversationFilter>("all")

  // Auto-select conversation from URL query param (e.g. /chat?conversationId=15)
  useEffect(() => {
    const conversationIdParam = searchParams.get("conversationId");
    if (!conversationIdParam || conversations.length === 0) return;

    const targetId = Number(conversationIdParam);
    const match = conversations.find(
      (c) => c.conversation.id === targetId
    );

    if (match) {
      handleSelectConversation(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations, searchParams]);

  const handleSelectConversation = (
    conversation: ConversationResponse
  ) => {
    setSelectedConversation(conversation);

    joinConversation({
      conversationId: Number(conversation.conversation.id),
    });


    if (window.innerWidth < 768) {
      setIsMobileChatOpen(true);
    }

  };


  const handleBack = () => {
    setIsMobileChatOpen(false);
  }
  const selectedCon = selectedConversation?.conversation.id ?? 0
  const { data: messagesResponse,
    isLoading: messagesLoading, } = useGetConversationMessagesQuery(
      selectedCon,
      {
        skip: !selectedConversation,
        pollingInterval: 60000,
        skipPollingIfUnfocused: true
      }
    )



  const messages = messagesResponse?.data ?? [];
  const otherParticipant =
    selectedConversation?.conversation.participants.find(
      (p) => p.user.id !== currentUserId
    );

  const isOnline = onlineUsers.has(
    otherParticipant?.user.id ?? 0
  )
  useEffect(() => {
    if (!selectedConversation) return;
    const hasUnreadMessages = messages.some(
      (message) =>
        message.sender.id !== currentUserId &&
        !message.seenAt
    );

    if (!hasUnreadMessages) return;
    markSeen({
      conversationId:
        selectedConversation.conversation.id,
    });
  }, [
    messages,
    selectedConversation,
    currentUserId,
    markSeen,
  ]);
  const handleSendMessage = (text: string) => {
    if (!selectedConversation) return;

    const receiver = selectedConversation.conversation.participants.find(
      (participant) => participant.user.id !== currentUserId
    );

    if (!receiver) return;

    sendMessage({
      conversationId: selectedConversation.conversation.id,
      receiverId: receiver.user.id,
      content: text,
    });
  };

  const handleDeleteMessage = (messageId: number) => {
    deleteForEveryone({
      conversationId: Number(selectedConversation!.conversation.id),
      messageId,
    })
  }
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading conversations...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        Failed to load conversations.
      </div>
    );
  }
  return (
    <main className="flex h-[calc(100vh-64px)] overflow-hidden bg-surface">


      <ConversationList
        conversations={conversations}
        selectedConversation={selectedConversation}
        filter={filter}
        onFilterChange={setFilter}
        onSelectConversation={handleSelectConversation}
        className={`
          ${isMobileChatOpen
            ? "hidden"
            : "flex"
          }
          md:flex
        `}
      />

      <ChatWindow
        conversation={selectedConversation}
        messages={messages}
        isOnline={isOnline}
        onDeleteMessage={handleDeleteMessage}
        currentUserId={currentUserId}
        isTyping={isTyping}
        typingStart={typingStart}
        typingStop={typingStop}
        onSendMessage={handleSendMessage}
        onBack={handleBack}
        className={`
    flex-1
    ${isMobileChatOpen ? "flex" : "hidden"}
    md:flex
  `}
      />
    </main>
  );
}