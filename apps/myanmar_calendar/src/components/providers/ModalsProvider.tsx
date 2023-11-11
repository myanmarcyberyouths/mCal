import React from "react";
import RenderDayDialog from "../modals/DayDialog/RenderDayDialog";
import RenderNewEventDialog from "../modals/AddEventDialog/RenderNewEventDialog";
import RenderSetting from "../modals/Setting/RenderSetting";

function ModalsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RenderDayDialog />
      <RenderNewEventDialog />
      <RenderSetting />
      {children}
    </>
  );
}

export default ModalsProvider;
