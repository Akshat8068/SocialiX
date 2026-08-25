import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
type ButtonVariant =
    | "primary"
    | "secondary"
    | "tertiary"
    | "outlined"
    | "ghost"
    | "destructive";

type ButtonSize = "sm" | "md" | "lg";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}



const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container " +
        "active:bg-primary-container active:text-on-primary-container " +
        "disabled:bg-surface-container-highest disabled:text-on-surface/40",

    secondary:
        "bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container " +
        "active:bg-secondary-container active:text-on-secondary-container " +
        "disabled:bg-surface-container-highest disabled:text-on-surface/40",

    tertiary:
        "bg-tertiary text-on-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container " +
        "active:bg-tertiary-container active:text-on-tertiary-container " +
        "disabled:bg-surface-container-highest disabled:text-on-surface/40",

    outlined:
        "border border-outline bg-transparent text-primary hover:bg-primary/10 " +
        "active:bg-primary/20 " +
        "disabled:border-on-surface/20 disabled:text-on-surface/40",

    ghost:
        "bg-transparent text-primary hover:bg-primary/10 " +
        "active:bg-primary/20 " +
        "disabled:text-on-surface/40",

    destructive:
        "bg-error text-on-error hover:bg-error-container hover:text-on-error-container " +
        "active:bg-error-container active:text-on-error-container " +
        "disabled:bg-surface-container-highest disabled:text-on-surface/40",
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-sm rounded-md",
    md: "h-11 px-5 text-base rounded-lg",
    lg: "h-12 px-6 text-lg rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = "primary",
            size = "md",
            isLoading = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            disabled,
            className,
            children,
            type = "button",
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled || isLoading}
                aria-busy={isLoading}
                className={cn(
                    "inline-flex items-center justify-center gap-2",
                    "font-medium select-none",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:cursor-not-allowed",
                    fullWidth && "w-full",
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {isLoading ? (
                    <span
                        className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                        aria-hidden="true"
                    />
                ) : (
                    leftIcon
                )}

                <span>{children}</span>

                {!isLoading && rightIcon}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonSize, ButtonVariant };