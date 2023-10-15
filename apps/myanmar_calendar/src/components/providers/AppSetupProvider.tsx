import useSetupCalendarState from "@/hooks/useSetupCalendarState";
import React from "react";
import ModalsProvider from "./ModalsProvider";

function AppSetupProvider({ children }: { children: React.ReactNode }) {
  useSetupCalendarState();

  return (
    <>
      <ModalsProvider>{children}</ModalsProvider>
    </>
  );
}

export default AppSetupProvider;
