import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { FiMaximize2 } from "react-icons/fi";
import { Button } from "@/components/ui/buttons/Button";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { format } from "date-fns";

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: Date;
}

function NewEventDialog({ isOpen, onClose, selectedDay }: AddEventDialogProps) {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enterFrom="opacity-50  translate-x-[100%]"
          enterTo="opacity-100 translate-x-0"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-[100%]"
          enter="ease-out duration-250"
          leave="ease-in duration-200">
          <Dialog.Panel
            className="fixed inset-0 mx-2 ml-auto my-auto w-[27rem] h-[97%] transform overflow-hidden rounded-lg bg-cgray-0 text-left align-middle shadow-lg transition-all flex flex-col border  border-cgray-200 "
            style={{
              boxShadow: "0 14px 18px 3px hsl(--cgray-50), 0 9px 16px 8px hsl(--cgray-100), 0 11px 15px -7px hsl(--cgray-100)",
            }}>
            <div className="h-[3rem]  flex items-center justify-between px-3 bg-cgray-50 border-b">
              <button
                onClick={() => {
                  onClose();
                }}>
                <HiOutlineArrowSmallRight
                  size={21}
                  className="text-cgray-600 hover:text-rose-500"
                />
              </button>
            </div>
            <div className="px-3">
              <time className="flex items-center gap-2 h-[3rem]">
                <span className="text-[1.3rem] text-cgray-500">{format(selectedDay, "iii, d MMMM")}</span>
                <span className="text-[1.3rem] text-rose-500 ">{selectedDay.getFullYear()}</span>
              </time>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default NewEventDialog;
