"use client";

import { useState } from "react";

import { Hash, Plus } from "lucide-react";
import { toast } from "react-toastify";


import { useCreateHashtagMutation } from "../api/hashtag.api"
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button"

export default function AddHashtagForm() {
    const [name, setName] = useState("");

    const [createHashtag, { isLoading }] =
        useCreateHashtagMutation();

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const hashtag = name
            .trim()
            .replace(/^#/, "");

        if (!hashtag) {
            toast.error("Please enter a hashtag.");
            return;
        }

        try {
            const response = await createHashtag({
                name: hashtag,
            }).unwrap();

            toast.success(response.message);

            setName("");
        } catch (error: any) {
            toast.error(
                error?.data?.message ?? "Failed to create hashtag."
            );
        }
    };

    return (
        <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Create Custom
            </h3>

            <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3"
            >
                <Input
                    icon={Hash}
                    placeholder="Enter hashtag..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                    spellCheck={false}
                />


                <Button
                    type="submit"
                    isLoading={isLoading}
                    leftIcon={<Plus size={18} />}
                >
                    Add
                </Button>
            </form>
        </div>
    );
}