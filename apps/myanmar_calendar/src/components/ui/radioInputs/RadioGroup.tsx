"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
// import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";
import { FaCircle } from "react-icons/fa";

const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Root>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("grid gap-2 ", className)}
      {...props}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>>(
  ({ className, children, ...props }, ref) => {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border-[2px] border-gray-500  text-rose-500 focus:outline-none focus-visible:ring-2 ring-gray-300 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer flex items-center justify-center",
          className
        )}
        {...props}>
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <FaCircle className="h-[0.55rem] w-[0.55rem] fill-current" />
          {/* <Circle className="h-2.5 w-2.5 fill-current text-current" /> */}
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );
  }
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
