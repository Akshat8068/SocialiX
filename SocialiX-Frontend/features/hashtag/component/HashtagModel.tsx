"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

import UserModelHeader from "../../../components/UserListModel/UserModelHeader";
import UserSearch from "../../../components/UserListModel/UserSearch";
import HashtagFooter from "./HashtagFooter";
import AddHashtagForm from "./AddHashtagForm";
import TrendingHashtags from "./TrendingHashtags";
import { useCreateHashtagMutation, useGetAllHashtagsQuery } from "../api/hashtag.api";
import { toast } from "react-toastify";

interface HashtagModalProps {
    selected: string[];
    onDone: (hashtags: string[]) => void;
    onClose: () => void;
}

export default function HashtagModel({ selected, onDone, onClose }: HashtagModalProps) {
    const [search, setSearch] = useState("")
    const [selectedTags, setSelectedTags] = useState(selected)
    const toggleHashtag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        )
    }

    return (
        <>
            {/* Overlay */}
            <div

                className="fixed inset-0 z-40  bg-overlay backdrop-blur-sm"
            />


            {/* Modal */}
            <div
                className="
      fixed
      z-50
      flex
      flex-col
      bg-surface-container
text-on-surface
      shadow-2xl

      inset-x-0
      bottom-0
      max-h-[92vh]
      rounded-t-4xl

      md:left-1/2
      md:top-1/2
      md:bottom-auto
      md:inset-x-auto
      md:w-150
      md:max-h-[80vh]
      md:-translate-x-1/2
      md:-translate-y-1/2
      md:rounded-3xl
    "
            >
                {/* Grabber */}
                <div className="flex justify-center py-3 md:hidden">
                    <div className="h-1.5 w-14 rounded-full bg-outline" />
                </div>

                {/* Close button */}
                <button type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 hidden md:flex h-9 w-9 items-center justify-center rounded-full hover:bg-hover text-on-surface"
                >
                    <X size={18} />
                </button>

                <UserModelHeader title="Add Hashtags"
                    onClose={onClose} />

                <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                    <UserSearch
                        value={search}
                        onChange={setSearch}
                        placeholder="Search hashtags"
                    />

                    <TrendingHashtags
                        selected={selectedTags}
                        onToggle={toggleHashtag}
                    />

                    <AddHashtagForm />
                </div>

                <HashtagFooter onDone={() => onDone(selectedTags)}
                    onCancel={onClose} />
            </div>

        </>
    );
}
