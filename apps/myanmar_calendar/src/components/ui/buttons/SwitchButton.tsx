import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[1.75rem] w-[2.85rem] sm2:h-[20px] sm2:w-[35px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-emerald-500 hover:data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-gray-200 hover:data-[state=unchecked]:bg-gray-300",
      className
    )}
    {...props}
    ref={ref}>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-[1.5rem] w-[1.5rem] sm2:h-[1.1rem] sm2:w-[1.1rem] rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[1.1rem] sm2:data-[state=checked]:translate-x-[0.925rem] data-[state=unchecked]:translate-x-0 "
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
