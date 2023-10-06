import React, { useEffect, useRef, useState } from "react";
import DayDialog from "./DayDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setDayDialongTargetDay } from "@/store/modelControlState";

function RenderDayDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dayDialogTargetDay = useSelector((state: RootState) => state.modelControlState.dayDialogTargetDay);

  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    if (dayDialogTargetDay) setIsOpen(true);
  }, [dayDialogTargetDay]);

  return (
    <DayDialog
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          dispatch(setDayDialongTargetDay(null));
        }, 200);
      }}
      selectedDay={new Date(dayDialogTargetDay)}
    />
  );
}

export default RenderDayDialog;
