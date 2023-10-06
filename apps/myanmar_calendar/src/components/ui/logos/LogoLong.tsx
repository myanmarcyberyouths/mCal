import React from "react";
import { BsCalendar2Check } from "react-icons/bs";

function LogoLong() {
  return (
    <div className="flex items-center gap-3">
      {/* Logo placeholder */}
      <BsCalendar2Check
        size={32}
        className="text-yellow-500"
      />
      <h1 className="text-[1.8rem] text-gray-500">Calendar</h1>
    </div>
  );
}

export default LogoLong;
