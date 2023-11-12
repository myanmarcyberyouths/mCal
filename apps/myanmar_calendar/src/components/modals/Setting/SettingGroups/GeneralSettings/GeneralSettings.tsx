import React from "react";
import DarkMode from "./DarkMode";
import DateTimeSetting from "./DateTimeSetting";

function GeneralSettings() {
  return (
    <div>
      <DateTimeSetting />
      <DarkMode />
    </div>
  );
}

export default GeneralSettings;
