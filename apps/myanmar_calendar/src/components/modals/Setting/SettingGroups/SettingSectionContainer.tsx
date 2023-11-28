import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface ContainerProps {
  label: string;
  className?: string;
  bottomBorder?: boolean;
}

function SettingSectionContainer({
  label,
  children,
  bottomBorder = true,
  className,
}: ContainerProps & PropsWithChildren) {
  return (
    <div
      className={cn(
        "border-gray-200/80 px-2 pb-8 pt-4 dark:border-gray-300/80",
        bottomBorder && "border-b",
        className,
      )}
    >
      <h4 className="mb-4 text-[0.85rem] font-medium uppercase text-gray-400 dark:text-gray-500">
        {label}
      </h4>
      <div>{children}</div>
    </div>
  );
}

export default SettingSectionContainer;
