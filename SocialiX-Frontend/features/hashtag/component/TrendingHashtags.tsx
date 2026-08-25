"use client";


import { Hashtag } from "@/types/hashTag";
import HashtagChip from "./HashtagChip";
import { useGetAllHashtagsQuery } from "../api/hashtag.api";


interface TrendingHashtagsProps {
    selected: string[];

    onToggle: (tag: string) => void;
    loading?: boolean;
}

export default function TrendingHashtags({ selected, onToggle }: TrendingHashtagsProps) {
    const { data: hashtagsData, isLoading } = useGetAllHashtagsQuery()
    const hashtags = hashtagsData?.data ?? []

    return (
        <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                All Hashtags
            </h3>

            <div className="flex flex-wrap gap-2">
                <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag) => (
                        <HashtagChip
                            key={tag.id}
                            hashtag={tag.name}
                            selected={selected.includes(tag.name)}
                            onClick={() => onToggle(tag.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
