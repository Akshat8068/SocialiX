// app/messages/components/ChatWindow/DateDivider.tsx

"use client";

interface DateDividerProps {
  label: string;
}

const DateDivider = ({ label }: DateDividerProps) => {
  return (
    <div className="flex items-center justify-center py-2">
      <span className="rounded-full bg-surface-container px-3 py-1 text-xs font-medium text-on-surface-variant shadow-sm">
        {label}
      </span>
    </div>
  );
};

export default DateDivider;