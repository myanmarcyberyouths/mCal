import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

function CheckboxSection({ title, checkList }: { title: string; checkList: Record<string, boolean> }) {
  return (
    <div>
      <p>{title}</p>
    </div>
  );
}

export default CheckboxSection;

function PreferenceManager() {
  const preferences = useSelector((state: RootState) => state.calendarState.cellPreferance);

  return (
    <CheckboxSection
      title="Preference"
      checkList={preferences}
    />
  );
}
