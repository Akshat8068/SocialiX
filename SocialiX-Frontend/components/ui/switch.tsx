import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({
  checked,
  onCheckedChange,
  disabled,
}: SwitchProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
       checked
          ? "border-primary bg-primary"
          : "border-outline bg-surface-container-high",

        "focus:outline-none focus:ring-2 focus:ring-primary/30",

        disabled && "cursor-not-allowed opacity-50")}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-switch-thumb transition-all",
          checked ? "left-5.5" : "left-0.5"
        )}
      />
    </button>
  );
}