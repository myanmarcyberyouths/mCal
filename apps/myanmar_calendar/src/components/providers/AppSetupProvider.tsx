import useSetupCalendarState from "@/hooks/useSetupCalendarState";
import React from "react";

function AppSetupProvider({ children }: { children: React.ReactNode }) {
  useSetupCalendarState();

  return <>{children}</>;
}

export default AppSetupProvider;
