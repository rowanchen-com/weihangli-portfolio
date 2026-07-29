import { cn } from "@/lib/utils";

type BadgeProps = {
    children: React.ReactNode;
    variant?: "outline" | "filled";
    className?: string;
};

export default function Badge({
    children,
    variant = "outline",
    className,
}: BadgeProps) {
    return (
        <span
            className={cn(
                "rounded-full px-3 py-1 text-xs lg:text-sm font-medium tracking-tight",
                {
                    "border-[1.75px] border-secondary-foreground/70 text-secondary-foreground/70 uppercase":
                        variant === "outline",
                    "bg-secondary-foreground/70 text-secondary":
                        variant === "filled",
                },
                className
            )}
        >
            {children}
        </span>
    );
}
