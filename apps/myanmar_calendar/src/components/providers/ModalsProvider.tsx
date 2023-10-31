import React from "react";
import RenderDayDialog from "../modals/DayDialog/RenderDayDialog";
import RenderNewEventDialog from "../modals/AddEventDialog/RenderNewEventDialog";

function ModalsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RenderDayDialog />
      <RenderNewEventDialog />
      {children}
    </>
  );
}

export default ModalsProvider;
