import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "border-zinc-700 bg-zinc-800 text-zinc-100",
    secondary: "border-zinc-800 bg-zinc-900 text-zinc-300",
    destructive: "border-red-900/60 bg-red-950/60 text-red-300",
    outline: "text-zinc-200 border-zinc-700 bg-transparent",
    low: "bg-zinc-800 text-zinc-300 border-zinc-700",
    medium: "bg-zinc-800 text-white border-zinc-600 font-semibold",
    high: "bg-white text-black border-white font-bold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    />
  );
}

export { Badge };
