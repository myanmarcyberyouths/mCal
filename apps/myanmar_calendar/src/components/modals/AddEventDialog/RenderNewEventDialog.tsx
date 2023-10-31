import { RootState } from "@/store";
import { setNewEventDialongTargetDay } from "@/store/modelControlState";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewEventDialog from "./NewEventDialog";

function RenderNewEventDialog() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const newEventDialogTargetDay = useSelector((state: RootState) => state.modelControlState.newEventDialogTargetDay);

  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    if (newEventDialogTargetDay) setIsOpen(true);
  }, [newEventDialogTargetDay]);

  const handleClose = () => {
    setIsOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      dispatch(setNewEventDialongTargetDay(null));
    }, 200);
  };

  return (
    <NewEventDialog
      isOpen={isOpen}
      onClose={handleClose}
      selectedDay={new Date(newEventDialogTargetDay)}
    />
  );
}

export default RenderNewEventDialog;
