// app/messages/components/ChatWindow/TypingIndicator.tsx

"use client";

import { Dot } from "lucide-react";

interface TypingIndicatorProps {
  name?: string;
}

const TypingIndicator = ({
  name = "Someone",
}: TypingIndicatorProps) => {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[85%] items-end gap-3 md:max-w-[70%]">
        {/* Avatar Placeholder */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container text-xs font-semibold text-on-surface-variant">
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex">
            <Dot size={18} />
            <Dot size={18}/>
            <Dot size={18}/>
          </div>
          <span className="px-1 text-xs text-on-surface-variant">
            {name} is typing...
          </span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;