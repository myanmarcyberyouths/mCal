import React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ScrollArea, ScrollBar, ScrollViewport } from "../areas/ScrollArea";
import { cn } from "@/lib/utils";
import { BsCheckLg } from "react-icons/bs";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    config?: {};
  }
>(({ className, children, config: {} = {}, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "border flex-shrink-0 border-gray-250 rounded-sm flex justify-stretch items-center w-full px-2 outline-0 hover:bg-gray-100 hover:border-gray-300 active:border-gray-500 h-input-md",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Value
    className={cn("capitalize text-[1.05rem]", className)}
    {...props}
  />
));
SelectValue.displayName = SelectPrimitive.Value.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(
  (
    { className, children, position = "popper", align = "start", ...props },
    ref,
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn("bg-gray-0 dark:bg-gray-75 rounded-md border border-gray-200 mt-1 shadow-lg z-[10]", className)}
        position={position}
        align={align}
        {...props}
      >
        <ScrollArea className={cn("w-full h-fit p-[0.2rem]", className)}>
          <ScrollViewport className="max-h-[17rem] w-full">
            <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
            <ScrollBar />
          </ScrollViewport>
        </ScrollArea>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={className} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    showIndicator?: boolean;
  }
>(({ className, children, showIndicator = false, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "flex items-center h-[2.2rem] rounded cursor-pointer hover:bg-gray-50 focus:bg-gray-100 active:bg-gray-100 px-2 first-letter:capitalize outline-0 data-[state=checked]:bg-gray-200/70 w-full text-[0.9rem] text-gray-600",
      showIndicator ? "pl-8" : "pl-2",
      className,
    )}
    {...props}
  >
    {showIndicator && (
      <span className="absolute left-2 flex w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <BsCheckLg />
        </SelectPrimitive.ItemIndicator>
      </span>
    )}

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={className} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
