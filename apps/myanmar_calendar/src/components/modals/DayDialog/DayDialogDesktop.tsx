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
        <Dialog.Panel className="fixed inset-0 mx-auto mt-auto sm2:my-auto w-full sm2:max-w-[27rem] h-[calc(100%-5rem)] sm2:h-[90%] sm2:max-h-[33rem] transform overflow-hidden rounded-tr-2xl rounded-tl-2xl sm2:rounded-[0.5rem] bg-gray-0 text-left align-middle transition-all flex flex-col sm2:border  sm2:border-gray-200 shadow-model dark:shadow-model-dark">
          <DayDialogContent {...props} />
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  );
}

export default DayDialogDesktop;
