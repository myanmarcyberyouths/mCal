import React from "react";
import RenderDayDialog from "../modals/RenderDayDialog";

function ModalsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RenderDayDialog />
      {children}
    </>
  );
}

export default ModalsProvider;
