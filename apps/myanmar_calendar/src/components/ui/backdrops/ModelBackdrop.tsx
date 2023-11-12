import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";

function ModelBackdrop({ show, opacity = "opacity-50", onClick }: { show?: boolean; opacity?: string; onClick?: () => void }) {
  return (
    <Transition
      as={Fragment}
      appear
      show={show}>
      <Transition.Child
        as={Fragment}
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        enter="ease-out duration-150"
        leave="ease-in duration-200">
        <div
          className={cn(" fixed z-[9] inset-0 bg-black opacity-50", opacity)}
          onClick={onClick}
        />
      </Transition.Child>
    </Transition>
  );
}

export default ModelBackdrop;
