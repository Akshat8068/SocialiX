// app/messages/components/ConversationList/ConversationList.tsx

import { SquarePen } from "lucide-react";
import ConversationFilters, { ConversationFilter } from "./ConversationFilters";
import ConversationItem from "./ConversationItem";
import { ConversationResponse } from "@/types/chat";
import EmptyState from "@/components/common/EmptyState";



interface ConversationListProps {
    conversations: ConversationResponse[];
    className?: string
    filter: ConversationFilter;
    onFilterChange: (filter: ConversationFilter) => void
    selectedConversation: ConversationResponse | null;
    onSelectConversation: (conversation: ConversationResponse) => void;
}
const ConversationList = ({
    conversations,
    selectedConversation,
    onSelectConversation,
    filter,
    onFilterChange,
    className = "",
}: ConversationListProps) => {
    return (
        <aside
            className={`
        w-full
        md:w-80
        lg:w-100
        bg-surface
        border-r
        border-outline-variant/30
        flex
        flex-col
        ${className}
      `}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-outline-variant/20 p-4">
                <h1 className="text-headline-md font-semibold text-on-surface">
                    Inbox
                </h1>

                <button
                    type="button"
                    aria-label="New Conversation"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-on-primary transition-all hover:opacity-90 active:scale-95"
                >
                    <SquarePen size={20} strokeWidth={2} />
                </button>
            </div>

            {/* Filters */}
            <ConversationFilters
                value={filter}
                onChange={onFilterChange}
            />

            {/* Conversation List */}
            <div className="custom-scrollbar flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                    <EmptyState variant="conversations" className="h-full" />
                ) : (
                    conversations.map((conversation) => (
                        <ConversationItem
                            key={conversation.id}
                            conversation={conversation}
                            active={selectedConversation?.id === conversation.id}
                            onClick={() => onSelectConversation(conversation)}
                        />
                    ))
                )}
            </div>
        </aside>
    );
};

export default ConversationList;