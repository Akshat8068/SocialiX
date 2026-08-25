"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";

interface AddCommentProps {
    profilePicture: string;
    onSubmit: (content: string) => void;
}

interface CommentForm {
    content: string;
}

export default function AddComment({
    profilePicture,
    onSubmit,
}: AddCommentProps) {
    const form = useForm<CommentForm>({
        defaultValues: {
            content: "",
        },
    });

    const handleSubmit = (values: CommentForm) => {
        if (!values.content.trim()) return;

        onSubmit(values.content);
        form.reset();
    };

    return (
        <div className="flex items-center gap-3 px-4 py-3">
            <Image
                src={profilePicture || "/Hero.jpg"}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full object-cover"
            />

            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-1 items-center gap-2"
            >
                <input
                    {...form.register("content")}
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 rounded-full px-4 py-2 text-sm outline-none transition-colors"
                    style={{
                        border: "1px solid var(--theme-outline)",
                        backgroundColor: "var(--theme-input)",
                        color: "var(--theme-on-surface)",
                    }}
                />
                <button
                    type="submit"
                    className="text-sm font-semibold hover:opacity-80 transition-opacity"
                    style={{ color: "var(--theme-primary)" }}
                >
                    Post
                </button>
            </form>
        </div>
    );
}