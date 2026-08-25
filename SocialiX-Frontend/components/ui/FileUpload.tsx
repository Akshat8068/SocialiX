"use client";

import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import { Camera, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  value?: File[];
  previewUrls?: string[];
  onChange: (files: File[]) => void;

  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  disabled?: boolean;
}

export default function FileUpload({
  value = [],
  previewUrls = [],
  onChange,
  accept = "image/*",
  multiple = false,
  maxFiles = 1,
  disabled = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (!files.length) return;

    const selected = multiple ? files.slice(0, maxFiles) : [files[0]];

    onChange(selected);

    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-outline-variant bg-surface p-6 min-h-64 cursor-pointer"
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        hidden
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleSelect}
        // stop click from bubbling back up to the outer div (would double-trigger)
        onClick={(e) => e.stopPropagation()}
      />

      {previewUrls.length === 0 ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Camera size={22} />
          </div>
          <p className="text-sm font-medium text-on-surface">
            Upload your visuals
          </p>
          <p className="text-xs text-on-surface-variant">
            Drag and drop or tap to upload media
          </p>
          <Button
            type="button"
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            
            {multiple ? "Select Media" : "Select Image"}
          </Button>
        </div>
      ) : (
        <div
          className={`w-full ${multiple ? "grid grid-cols-3 gap-3" : "flex justify-center"}`}
          // prevent the preview area click from re-opening the picker
          onClick={(e) => e.stopPropagation()}
        >
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <Image
                src={url}
                alt="Preview"
                width={140}
                height={140}
                className="h-32 w-32 rounded-lg object-cover"
              />
              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="absolute right-2 top-2"
                onClick={() => handleRemove(index)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
