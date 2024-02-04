import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[1.75rem] w-[2.85rem] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-200 hover:data-[state=checked]:bg-emerald-600 hover:data-[state=unchecked]:bg-gray-300 dark:data-[state=checked]:bg-emerald-600 dark:data-[state=unchecked]:bg-gray-300 sm2:h-[20px] sm2:w-[35px]",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-[1.5rem] w-[1.5rem] rounded-full bg-gray-0 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.1rem] data-[state=unchecked]:translate-x-0 dark:bg-gray-50 sm2:h-[1.1rem] sm2:w-[1.1rem] sm2:data-[state=checked]:translate-x-[0.925rem] ",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
