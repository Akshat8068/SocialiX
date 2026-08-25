import { useEffect } from "react";
import type {
  ConversationSeenEvent,
  DeleteForEveryonePayload,
  JoinConversationPayload,
  MarkSeenPayload,
  Message,
  MessageDeletedEvent,
  MessageNotificationEvent,
  SendMessagePayload,
  TypingPayload,
  UserOfflineEvent,
  UserOnlineEvent,
  UserTypingEvent,
} from "@/types/chat";
import { socket } from "../services/socket";

interface UseChatSocketProps {
  onNewMessage?: (message: MessageNotificationEvent) => void;
  onTyping?: (payload: UserTypingEvent) => void;
  onConversationSeen?: (payload: ConversationSeenEvent) => void;
  onUserOnline?: (payload: UserOnlineEvent) => void;
  onUserOffline?: (payload: UserOfflineEvent) => void;
  onMessageDeleted?: (payload: MessageDeletedEvent) => void
}

const useChatSocket = ({
  onNewMessage,
  onTyping,
  onConversationSeen,
  onMessageDeleted, onUserOnline,
  onUserOffline
}: UseChatSocketProps = {}) => {
  useEffect(() => {


    // Connection Events
    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected");
    });

    socket.on("connect_error", (err) => {
      console.log("Socket Error:", err.message);
    });
    if (onConversationSeen) {
      socket.on(
        "conversationSeen",
        onConversationSeen
      );
    }
    // Chat Events
    if (onNewMessage) {
      socket.on("newMessage", onNewMessage);
    }

    if (onTyping) {

      socket.on("userTyping", onTyping);
    }
    if (onMessageDeleted) {
      socket.on("messageDeleted", onMessageDeleted);
    }

    
    if (onUserOnline) {
      socket.on("userOnline", onUserOnline);
    }

    if (onUserOffline) {
      socket.on("userOffline", onUserOffline);
    }

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");

      if (onNewMessage) {
        socket.off("newMessage", onNewMessage);
      }

      if (onTyping) {
        console.log("Typing event")
        socket.off("userTyping", onTyping);
      }
      if (onUserOnline) {
        socket.off("userOnline", onUserOnline);
      }

      if (onUserOffline) {
        socket.off("userOffline", onUserOffline);
      }
      if (onMessageDeleted) {
        socket.off("messageDeleted", onMessageDeleted);
      }
      if (onConversationSeen) {
        socket.off(
          "conversationSeen",
          onConversationSeen
        );
      }

    };
  }, [onNewMessage, onTyping, onConversationSeen, onUserOffline, onUserOnline, onConversationSeen, onMessageDeleted]);

  const joinConversation = (payload: JoinConversationPayload) => {
    socket.emit("joinConversation", payload);
  };

  const sendMessage = (payload: SendMessagePayload) => {
    socket.emit("sendMessage", payload);
  };

  const typingStart = (payload: TypingPayload) => {
    socket.emit("typingStart", payload);
  };

  const typingStop = (payload: TypingPayload) => {
    socket.emit("typingStop", payload);
  };

  const markSeen = (payload: MarkSeenPayload) => {
    socket.emit("markSeen", payload);
  };

  const deleteForEveryone = (
    payload: DeleteForEveryonePayload
  ) => {
    socket.emit("deleteForEveryone", payload);
  };

  return {
    socket,
    joinConversation,
    sendMessage,
    typingStart,
    typingStop,
    markSeen,
    deleteForEveryone,
  };
};

export default useChatSocket;