"use client";

import Image from "next/image";
import { ArrowLeft, Camera, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormBuilder, FormFieldConfig } from "@/components/common/FormBuilder";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    useRemoveProfilePictureMutation,
    useUpdateProfileMutation,
    useUpdateProfilePictureMutation,
} from "../api/profile.api";
import { ProfileUpdateSchema, UpdateProfileFormData } from "@/features/auth/validation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";

const profileFields: FormFieldConfig[] = [
    {
        id: "bio",
        type: "textarea",
        label: "Bio",
        placeholder: "Tell something about yourself",
    },
    {
        id: "website",
        type: "text",
        label: "Website",
        placeholder: "https://example.com",
    },
    {
        id: "accountType",
        type: "switch",
        label: "Private Account",
        helperText: "Only approved followers can see your posts.",
    },
];

export default function EditProfileForm() {
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [updateProfilePicture, { isLoading: isUploading }] = useUpdateProfilePictureMutation();
    const [removeProfilePicture, { isLoading: isRemoving }] = useRemoveProfilePictureMutation();

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const form = useForm<UpdateProfileFormData>({
        resolver: zodResolver(ProfileUpdateSchema),
        defaultValues: {
            bio: "",
            website: "",
            accountType: "PUBLIC",
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setProfileImage(file);
        setPreview(URL.createObjectURL(file));
        e.target.value = "";
    };

    const handleSubmit = async (data: UpdateProfileFormData) => {
        try {
            const response = await updateProfile(data).unwrap();

            if (profileImage) {
                const res = await updateProfilePicture({
                    profilePicture: profileImage,
                }).unwrap();
                toast.success(res.message);
            }

            form.reset();
            toast.success(response.message);
            router.push("/profile");
        } catch {
            toast.error("Something went wrong");
        }
    };

    const handleRemoveProfilePicture = async () => {
        try {
            const response = await removeProfilePicture().unwrap();
            toast.success(response.message);
            setProfileImage(null);
            setPreview(null);
            router.push("/profile");
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <section className="mx-auto max-w-4xl space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="rounded-full p-2 transition hover:bg-surface-container"
                >
                    <ArrowLeft size={22} />
                </button>

                <div>
                    <h1 className="text-2xl font-bold md:text-3xl">Edit Profile</h1>
                    <p className="text-sm text-on-surface-variant">
                        Update your profile information.
                    </p>
                </div>
            </div>

            {/* Avatar card */}
            <div className="rounded-2xl border border-outline-variant bg-surface p-6 shadow-sm">
                <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">

                    {/* Circle avatar + camera badge */}
                    <div className="relative shrink-0">
                        <div className="h-24 w-24 overflow-hidden rounded-full  ring-offset-2 ring-offset-surface">
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt="Profile picture preview"
                                    width={96}
                                    height={96}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-surface-container">
                                    <Camera size={28} className="text-on-surface-variant" />
                                </div>
                            )}
                        </div>

                        {/* Small camera badge */}
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            disabled={isUploading}
                            aria-label="Change profile picture"
                            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary shadow-md transition hover:bg-primary-hover active:scale-95 disabled:opacity-60"
                        >
                            <Camera size={14} strokeWidth={2.2} />
                        </button>

                        <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Label + action buttons */}
                    <div className="flex flex-col items-center gap-3 sm:items-start">
                        <div className="text-center sm:text-left">
                            <p className="text-sm font-semibold text-on-surface">
                                Profile Picture
                            </p>
                            <p className="text-xs text-on-surface-variant">
                                Tap the camera icon to upload a new photo.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            

                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={handleRemoveProfilePicture}
                                disabled={isRemoving}
                            >
                                <Trash size={14} className="mr-1.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form fields */}
            <div className="pb-16">
                <FormBuilder
                    form={form}
                    fields={profileFields}
                    onSubmit={handleSubmit}
                    submitButton={{
                        children: isLoading ? "Saving..." : "Save",
                        variant: "primary",
                        size: "lg",
                        fullWidth: true,
                    }}
                />
            </div>
        </section>
    );
}
