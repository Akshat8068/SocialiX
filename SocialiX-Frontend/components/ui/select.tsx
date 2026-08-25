"use client";

import * as React from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  icon?: LucideIcon;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      icon: Icon,
      error,
      className,
      options,
      placeholder,
      value,
      defaultValue,
      onChange,
      name,
      disabled,
    },
    _ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string>(
      value ?? defaultValue ?? (placeholder ? "" : (options[0]?.value ?? ""))
    );
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Sync if controlled
    React.useEffect(() => {
      if (value !== undefined) setSelected(value);
    }, [value]);

    // Close on outside click
    React.useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    const selectedLabel =
      options.find((o) => o.value === selected)?.label ?? placeholder ?? "";

    const handleSelect = (optionValue: string) => {
      setSelected(optionValue);
      setOpen(false);
      // Synthesise a change event so react-hook-form works
      if (onChange) {
        const nativeInput = document.createElement("select");
        Object.defineProperty(nativeInput, "value", { value: optionValue });
        onChange({ target: nativeInput } as React.ChangeEvent<HTMLSelectElement>);
      }
    };

    return (
      <div className="space-y-1">
        <div ref={containerRef} className="group relative">
          {Icon && (
            <Icon
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary z-10"
            />
          )}

          {/* Hidden native select for form compatibility */}
          <select
            id={id}
            name={name}
            value={selected}
            disabled={disabled}
            onChange={() => {}}
            className="sr-only"
            aria-hidden="true"
            tabIndex={-1}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Custom trigger button */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "h-12 w-full flex items-center justify-between rounded-lg border bg-surface py-3 pr-10 outline-none transition-all text-sm text-left",
              Icon ? "pl-12" : "pl-4",
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                : open
                ? "border-primary ring-2 ring-primary/20"
                : "border-outline-variant/50 hover:border-primary/50",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
          >
            <span className={cn(!selected && "text-on-surface-variant")}>
              {selectedLabel}
            </span>
          </button>

          <ChevronDown
            size={18}
            className={cn(
              "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-outline transition-transform duration-200",
              open && "rotate-180"
            )}
          />

          {/* Dropdown list */}
          {open && (
            <ul
              role="listbox"
              className="absolute left-0 top-[calc(100%+4px)] z-50 w-full rounded-lg border border-outline-variant/50 bg-surface shadow-lg overflow-hidden"
            >
              {placeholder && (
                <li
                  role="option"
                  aria-selected={selected === ""}
                  onClick={() => handleSelect("")}
                  className="px-4 py-3 text-sm text-on-surface-variant cursor-pointer hover:bg-surface-container"
                >
                  {placeholder}
                </li>
              )}
              {options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={selected === option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "px-4 py-3 text-sm cursor-pointer hover:bg-surface-container transition-colors",
                    selected === option.value
                      ? "text-primary font-medium bg-primary/5"
                      : "text-on-surface"
                  )}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
