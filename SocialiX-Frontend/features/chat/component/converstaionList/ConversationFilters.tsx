// app/messages/components/ConversationList/ConversationFilters.tsx

export type ConversationFilter =
  | "all"
  | "unread"
  | "favorites"
  | "groups";

interface ConversationFiltersProps {
  value: ConversationFilter;
  onChange: (filter: ConversationFilter) => void;
}

const filters: {
  label: string;
  value: ConversationFilter;
}[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Unread",
    value: "unread",
  },
  {
    label: "Favorites",
    value: "favorites",
  },
  {
    label: "Groups",
    value: "groups",
  },
];

const ConversationFilters = ({
  value,
  onChange,
}: ConversationFiltersProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar border-b border-outline-variant/20">
      {filters.map((filter) => {
        const active = value === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`
              whitespace-nowrap
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-200
              border

              ${
                active
                  ? "border-primary bg-primary text-on-primary"
                  : "border-outline-variant/30 bg-surface-container-low text-on-surface-variant hover:border-primary hover:text-primary"
              }
            `}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default ConversationFilters;