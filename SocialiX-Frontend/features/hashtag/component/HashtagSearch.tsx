"use client";

import { Search, X } from "lucide-react";

interface HashtagSearchProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    loading?: boolean;
}

export default function HashtagSearch({
    value,
    onChange,
    onSearch,
    loading = false,
}: HashtagSearchProps) {
    return (
        <div className="flex items-center gap-3">
            {/* Input */}
            <div className="relative flex-1">
                <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search hashtag..."
                    autoComplete="off"
                    spellCheck={false}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            onSearch();
                        }
                    }}
                    className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-transparent
                        bg-zinc-100
                        pl-11
                        pr-10
                        text-sm
                        text-zinc-900
                        placeholder:text-zinc-500
                        outline-none
                        transition-all

                        focus:border-orange-400
                        focus:bg-white
                        focus:ring-4
                        focus:ring-orange-400/20

                        dark:bg-zinc-800
                        dark:text-white
                        dark:placeholder:text-zinc-400
                        dark:focus:border-orange-500
                        dark:focus:bg-on-background
                    "
                />

                {value && (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="
                            absolute
                            right-3
                            top-1/2
                            flex
                            h-7
                            w-7
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            text-zinc-500
                            transition
                            hover:bg-zinc-200
                            active:scale-95
                            dark:hover:bg-zinc-700
                        "
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Find Button */}
            <button
                type="button"
                onClick={onSearch}
                disabled={!value.trim() || loading}
                className="
                    h-11
                    rounded-xl
                    bg-orange-500
                    px-5
                    text-sm
                    font-semibold
                    text-white
                    transition-all

                    hover:bg-orange-600
                    active:scale-95

                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                {loading ? "Finding..." : "Find"}
            </button>
        </div>
    );
}