import { User } from "./auth";

export interface Message {
  id: number;
  content: string;
  sender: User;
  seenAt: string | null;
  isDeletedForEveryone: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface SocketMessage extends Message {
  conversationId: number;
}
export interface ConversationParticipant {
  id: number;
  user: User;
  joinedAt: string;
}

export interface Conversation {
  id: number;
  participants: ConversationParticipant[];
  lastMessage: string | null;
  lastMessageAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationResponse {
  id: number;
  joinedAt: string;
  conversation: Conversation;
unreadCount: number;
}



export interface CreateConversationRequest {
  receiverId: number;
}

// New conversation: { conversationId: number }
// Existing conversation: full ConversationResponse (participant with nested conversation)
export interface CreateConversationResponse {
  conversationId?: number;        // present when newly created (201)
  conversation?: Conversation;    // present when already existed (200)
}

/* ---------------- Socket Emit Payloads ---------------- */

export interface JoinConversationPayload {
  conversationId: number;
}

export interface SendMessagePayload {
  conversationId: number;
  receiverId: number;
  content: string;
}

export interface TypingPayload {
  conversationId: number;
}

export interface MarkSeenPayload {
  conversationId: number;
}

export interface DeleteForEveryonePayload {
  conversationId: number;
  messageId: number;
}

/* Socket Receive Events  */

export interface ConversationSeenEvent {
  conversationId: number;
  seenAt: string;
}

export interface MessageDeletedEvent {
  messageId: number;
  deletedAt: string;
  conversationId: number
}
export interface UserOnlineEvent {
  userId: number;
}
export interface UserOfflineEvent {
  userId: number;
  lastSeen: string;
}

export interface JoinedConversationEvent {
  conversationId: number;
  message: string;
}
export interface UserTypingEvent {
  conversationId: number;
  userId: number;
  username: string;
  isTyping: boolean;
}
export interface MessageNotificationEvent extends SocketMessage { }