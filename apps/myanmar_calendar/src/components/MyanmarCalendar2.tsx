import React from "react";
import Header from "./layouts/Navbar/Navbar";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Calendar from "./layouts/Calendar/Calendar";

function MyanmarCalendar2() {
  return (
    <>
      <Header />
      <main className="h-[calc(100vh-theme(spacing.nav-h))] flex items-stretch">
        <Sidebar />
        <Calendar />
      </main>
    </>
  );
}

export default MyanmarCalendar2;
