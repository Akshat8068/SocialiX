"use client";

interface HashtagFooterProps {
    onDone: () => void;
    onCancel: () => void;
    doneLabel?: string;
    cancelLabel?: string;
    doneDisabled?: boolean;
    loading?: boolean;
}

export default function HashtagFooter({
    onDone,
    onCancel,
    doneLabel = "Done",
    cancelLabel = "Cancel",
    doneDisabled = false,
    loading = false,
}: HashtagFooterProps) {
    return (
        <div className="border-t border-outline/30 bg-surface-container p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                {/* Cancel */}
                <button
                    type="button"
                    onClick={onCancel}
                    className="
                        h-11
                        rounded-xl
                        border
                        px-6
                        text-sm
                        font-medium
                        transition-all
                        active:scale-95 border-outline
                        bg-surface-container-low
                        text-on-surface
                        hover:bg-hover
                    "
                >
                    {cancelLabel}
                </button>

                {/* Done */}
                <button
                    type="button"
                    onClick={onDone}
                    disabled={doneDisabled || loading}
                    className="
                        h-11
                        rounded-xl
                        px-6
                        text-sm
                        font-semibold
                        transition-all
                        bg-primary
                        text-on-primary
                        hover:bg-primary-hover
                        active:scale-95
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >
                    {loading ? "Saving..." : doneLabel}
                </button>
            </div>
        </div>
    );
}