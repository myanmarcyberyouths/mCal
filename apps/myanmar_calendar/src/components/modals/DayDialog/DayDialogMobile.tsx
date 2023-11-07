import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { DayDialogProps } from "./DayDialog";
import DayDialogContent from "./DayDialogContent";
import BottomSheetMobile from "@/components/ui/sheets/BottomSheetMobile";

function DayDialogMobile(
  props: DayDialogProps & {
    open: boolean;
  }
) {
  return (
    <BottomSheetMobile
      isOpen={props.open}
      onClose={props.onClose}>
      <div className="mx-auto mt-auto sm2:my-auto h-full w-full transform overflow-hidden  bg-gray-0 transition-all flex flex-col">
        <DayDialogContent {...props} />
      </div>
    </BottomSheetMobile>
  );
}

export default DayDialogMobile;
