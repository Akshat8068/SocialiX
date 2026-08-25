"use client";

import clsx from "clsx";

interface HashtagChipProps {
    hashtag: string;
    selected?: boolean;
    onClick: () => void;
    disabled?: boolean;
}

export default function HashtagChip({
    hashtag,
    selected = false,
    onClick,
    disabled = false,
}: HashtagChipProps) {
    const formattedHashtag = hashtag.startsWith("#")
        ? hashtag
        : `#${hashtag}`;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                "active:scale-95",
                selected
                    ? "border-primary bg-primary text-on-primary shadow-sm"
                    : "border-outline bg-surface-container-low text-on-surface-variant hover:border-primary hover:bg-surface-container-high hover:text-primary",

                disabled &&
                "cursor-not-allowed opacity-50 active:scale-100 hover:border-outline hover:bg-surface-container-low hover:text-on-surface-variant"
            )}
        >
            {formattedHashtag}
        </button>
    );
}