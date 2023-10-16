import useSetupCalendarState from "@/hooks/useSetupCalendarState";
import React from "react";
import ModalsProvider from "./ModalsProvider";
import useSetupApp from "@/hooks/useSetupApp";

function AppSetupProvider({ children }: { children: React.ReactNode }) {
  useSetupCalendarState();
  useSetupApp();

  return (
    <>
      <ModalsProvider>{children}</ModalsProvider>
    </>
  );
}

export default AppSetupProvider;
