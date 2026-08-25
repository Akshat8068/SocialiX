import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  id: string;
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  id,
  label,
  required = false,
  error,
  helperText,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <label
          htmlFor={id}
          className="ml-1 text-sm font-medium text-on-surface-variant"
        >
          {label}

          {required && (
            <span className="ml-1 text-error">*</span>
          )}
        </label>
      )}

      {children}

      {error ? (
        <p className="ml-1 text-sm text-error">
          {error}
        </p>
      ) : helperText ? (
        <p className="ml-1 text-sm text-on-surface-variant">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}