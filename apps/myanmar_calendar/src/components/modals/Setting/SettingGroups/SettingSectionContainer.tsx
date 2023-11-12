import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface ContainerProps {
  label: string;
  className?: string;
  bottomBorder?: boolean;
}

function SettingSectionContainer({ label, children, bottomBorder = true, className }: ContainerProps & PropsWithChildren) {
  return (
    <div className={cn("px-2 pt-4 pb-8 border-gray-200/80 dark:border-gray-300/80", bottomBorder && "border-b", className)}>
      <h4 className="text-[0.85rem] uppercase text-gray-400 dark:text-gray-500 font-medium mb-4">{label}</h4>
      <div>{children}</div>
    </div>
  );
}

export default SettingSectionContainer;
