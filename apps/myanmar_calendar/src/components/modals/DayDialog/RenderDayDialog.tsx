import React, { Fragment, useEffect, useRef, useState } from "react";
import DayDialog2 from "./DayDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDayDialongTargetDay } from "@/store/modelControlState";
import { Transition } from "@headlessui/react";
import ModelBackdrop from "@/components/ui/backdrops/ModelBackdrop";

function RenderDayDialog2() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dayDialogTargetDay = useSelector((state: RootState) => state.modelControlState.dayDialogTargetDay);
  const enterMobileMode = useSelector((state: RootState) => state.systemState.enterMobileMode);
  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    if (dayDialogTargetDay) setIsOpen(true);
  }, [dayDialogTargetDay]);

  const handlClose = () => {
    setIsOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      dispatch(setDayDialongTargetDay(null));
    }, 200);
  };

  return (
    <Transition
      appear
      show={isOpen}>
      {enterMobileMode && (
        <ModelBackdrop
          show={isOpen}
          opacity="0.4"
        />
      )}

      <DayDialog2
        onClose={handlClose}
        selectedDay={new Date(dayDialogTargetDay)}
      />
    </Transition>
  );
}

export default RenderDayDialog2;
