"use client";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/FileUpload";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textArea";
import HashtagModel from "@/features/hashtag/component/HashtagModel";
import { useCreatePostMutation } from "@/features/post/api/post.api";
import { Hash, Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface CreatePostForm {
  caption: string;
  visibility: "PUBLIC" | "FOLLOWERS" 
}

export default function PostPage() {
  const [files, setFiles] = useState<File[]>([]);

  const [isHashtagModalOpen, setIsHashtagModalOpen] = useState(false)

  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])

  const [createPost, { isLoading }] = useCreatePostMutation();


  const router = useRouter();

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<CreatePostForm>({
      defaultValues: {
        caption: "",
        visibility: "PUBLIC",
      },
    });

  const caption = watch("caption");

  const previewUrls = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  // Called when user hits "Done" in the hashtag modal.
  const handleHashtagDone = (hashtags: string[]) => {
    setSelectedHashtags(hashtags);
  };

  const removeHashtag = (tag: string) => {
    setSelectedHashtags((prev) => prev.filter((t) => t !== tag));
  };

  const onSubmit = async (values: CreatePostForm) => {
    if (!files.length) {
      toast.error("Please select at least one media file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("caption", values.caption);
      formData.append("visibility", values.visibility);
      files.forEach((file) => {
        formData.append("media", file);

      })
      formData.append("hashtags", JSON.stringify(selectedHashtags))
      await createPost(formData).unwrap();
      reset();
      setFiles([]);
      setSelectedHashtags([]);
      toast.success("Post created successfully.");
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto w-full h-full max-w-7xl px-4 py-6 md:px-6">
      <h1 className="mb-6 text-2xl font-bold">Create Post</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Desktop: two-column layout */}
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">

          {/* ── Left: Media Upload ── */}
          <FileUpload
            value={files}
            previewUrls={previewUrls}
            onChange={setFiles}
            multiple
            maxFiles={2}
            accept="image/*,video/*"
          />

          {/* ── Right: Form Panel ── */}
          <div className="rounded-2xl border border-outline-variant bg-surface p-5 flex flex-col gap-5 pb-10">

            {/* Caption */}
            <div>
              <Textarea
                placeholder="Write a caption..."
                maxLength={3000}
                rows={4}
                {...register("caption")}
              />
              <div className="mt-1 flex justify-end text-xs text-on-surface-variant">
                {caption.length} / 3000
              </div>
            </div>

            {/* Add Hashtags */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsHashtagModalOpen(true)}
                className="flex w-full items-center justify-between rounded-lg border border-outline-variant/50 bg-surface px-4 py-3 text-sm text-on-surface hover:bg-surface-container transition-colors"
              >
                <span className="flex items-center gap-2 text-primary font-medium">
                  <Hash size={16} />
                  Add Hashtags
                </span>
                {selectedHashtags.length > 0 && (
                  <span className="text-xs text-on-surface-variant">
                    {selectedHashtags.length} selected
                  </span>
                )}
              </button>
              {selectedHashtags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedHashtags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-outline-variant/30" />

            {/* Audience / Visibility */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                Audience
              </p>
              <Select
                options={[
                  { label: "Everyone", value: "PUBLIC" },
                  { label: "Followers", value: "FOLLOWERS" },
                 
                ]}
                defaultValue="PUBLIC"
                {...register("visibility")}
                onChange={(e) =>
                  setValue(
                    "visibility",
                    e.target.value as CreatePostForm["visibility"]
                  )
                }
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-outline-variant/30" />

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              rightIcon={<Send size={16} />}
            >
              Share Post
            </Button>

          </div>

        </div>
      </form>


      {/* Hashtag Modal */}
      {isHashtagModalOpen && (
        <HashtagModel
          selected={selectedHashtags}
          onDone={(hashtags) => {
            setSelectedHashtags(hashtags);
            setIsHashtagModalOpen(false);
          }}
          onClose={() => setIsHashtagModalOpen(false)}
        />
      )}
    </div>
  );
}
