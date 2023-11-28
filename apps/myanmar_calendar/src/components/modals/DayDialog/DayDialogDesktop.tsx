import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DayDialogProps } from "./DayDialog";
import DayDialogContent from "./DayDialogContent";

function DayDialogDesktop(props: DayDialogProps) {
  return (
    <Dialog as="div" className="relative z-10" onClose={props.onClose}>
      <Transition.Child
        as={Fragment}
        enterFrom={"opacity-0  translate-y-5"}
        enterTo="opacity-100 translate-y-0"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo={"opacity-0  translate-y-5"}
        enter={" duration-200"}
        leave={"ease-in duration-150"}
      >
        <Dialog.Panel className="fixed inset-0 mx-auto mt-auto flex h-[calc(100%-5rem)] w-full transform flex-col overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-gray-0 text-left align-middle shadow-model transition-all dark:shadow-model-dark sm2:my-auto sm2:h-[90%] sm2:max-h-[33rem] sm2:max-w-[27rem]  sm2:rounded-[0.5rem] sm2:border sm2:border-gray-200">
          <DayDialogContent {...props} />
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  );
}

export default DayDialogDesktop;
