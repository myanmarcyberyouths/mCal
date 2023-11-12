import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDayDialongTargetDay } from "@/store/modelControlState";
import { Dialog, Transition } from "@headlessui/react";
import DayDialogContent, { DayDialogContentProps } from "./DayDialogContent";
import BottomSheetMobile from "@/components/ui/sheets/BottomSheetMobile";

function RenderDayDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dayDialogTargetDay = useSelector((state: RootState) => state.modelControlState.dayDialogTargetDay);
  const enterMobileMode = useSelector((state: RootState) => state.systemState.enterMobileMode);
  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    if (dayDialogTargetDay) setIsOpen(true);
  }, [dayDialogTargetDay]);

  const handleClose = () => {
    setIsOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      dispatch(setDayDialongTargetDay(null));
    }, 200);
  };

  if (enterMobileMode)
    return (
      <DayDialogMobile
        open={isOpen}
        onClose={handleClose}
        selectedDay={new Date(dayDialogTargetDay)}
      />
    );

  return (
    <Transition
      appear
      show={isOpen}>
      <DayDialogDesktop
        onClose={handleClose}
        selectedDay={new Date(dayDialogTargetDay)}
      />
    </Transition>
  );
}

export default RenderDayDialog;

// Mobile
function DayDialogMobile(
  props: DayDialogContentProps & {
    open: boolean;
  }
) {
  return (
    <BottomSheetMobile
      isOpen={props.open}
      onClose={props.onClose}>
      <div className="mx-auto mt-auto sm2:my-auto h-full w-full transform overflow-hidden bg-gray-0 dark:bg-gray-50 transition-all flex flex-col">
        <DayDialogContent {...props} />
      </div>
    </BottomSheetMobile>
  );
}

// Desktop
function DayDialogDesktop(props: DayDialogContentProps) {
  return (
    <Dialog
      as="div"
      className="relative z-10"
      onClose={props.onClose}>
      <Transition.Child
        as={Fragment}
        enterFrom={"opacity-0  translate-y-5"}
        enterTo="opacity-100 translate-y-0"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo={"opacity-0  translate-y-5"}
        enter={" duration-200"}
        leave={"ease-in duration-150"}>
        <Dialog.Panel className="fixed inset-0 mx-auto mt-auto sm2:my-auto w-full sm2:max-w-[27rem] h-[calc(100%-5rem)] sm2:h-[90%] sm2:max-h-[33rem] transform overflow-hidden rounded-tr-2xl rounded-tl-2xl sm2:rounded-[0.5rem] bg-gray-0 dark:bg-gray-75 text-left align-middle transition-all flex flex-col sm2:border  sm2:border-gray-200 shadow-model dark:shadow-model-dark">
          <DayDialogContent {...props} />
        </Dialog.Panel>
      </Transition.Child>
    </Dialog>
  );
}
