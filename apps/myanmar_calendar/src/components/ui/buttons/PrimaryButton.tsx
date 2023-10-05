import { cn } from "@/lib/utils";
import React from "react";

interface PrimaryButtonProps {
  config?: {
    width?: "full" | "fit";
  };
  loading?: boolean;
}

function PrimaryButton({
  config: { width = "fit" } = {},
  children,
  className,
  loading = false,
  ...props
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & PrimaryButtonProps) {
  const w = width === "full" ? "w-full flex-1" : "w-fit";

  return (
    <button
      {...props}
      type="button"
      className={cn("rounded-md flex justify-center items-center px-4 border border-gray-300 hover:bg-gray-100 active:bg-gray-200 font-semibold text-gray-700 h-input-md", w, className)}>
      {children}
    </button>
  );
}

export default PrimaryButton;
