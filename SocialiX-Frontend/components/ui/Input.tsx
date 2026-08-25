import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface Inputprops extends
    React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon,
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, Inputprops>(({  error, id, icon: Icon, className, type, ...props }, ref) => {
    return (
        <>
            <div className="space-y-1">
                
                <div className="relative group">
                    {Icon && (
                        <Icon
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors"
                        />
                    )}
                    <input
                        type={type}
                        id={id}
                        className={cn(
                            "w-full rounded-lg border bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant py-3 pr-4 outline-none transition-all",
                            Icon ? "pl-12" : "pl-4",
                            error
                                ? "border-red-500 focus:ring-red-500/20"
                                : "border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20",
                            className
                        )}
                        ref={ref}
                        {...props}

                    />
                    {error && (
                        <p className="mt-1 text-sm text-red-500">
                            {error}
                        </p>
                    )}
                </div>

            </div>
        </>

    )
})

Input.displayName = 'Input'

export { Input }