import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";

function ModelBackdrop({
  show,
  opacity = "0.4",
}: {
  show?: boolean;
  opacity?: string;
}) {
  return (
    <Transition as={Fragment} appear show={show}>
      <Transition.Child
        as={Fragment}
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        enter="ease-out duration-150"
        leave="ease-in duration-200"
      >
        <div
          className={cn("fixed inset-0 bg-black")}
          style={{ backgroundColor: `rgba(0,0,0,${opacity})` }}
        />
      </Transition.Child>
    </Transition>
  );
}

export default ModelBackdrop;
