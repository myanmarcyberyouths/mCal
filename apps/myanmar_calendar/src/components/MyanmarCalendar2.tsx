import React from "react";
import Header from "./layouts/Navbar/Navbar";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Calendar from "./layouts/Calendar/Calendar";

function MyanmarCalendar2() {
  return (
    <>
      <Header />
      <main className="flex h-[calc(100vh-theme(spacing.nav-h))] items-stretch supports-[height:100cqh]:h-[calc(100cqh-theme(spacing.nav-h))] supports-[height:100dvh]:h-[calc(100svh-theme(spacing.nav-h))] ">
        <Sidebar />
        <Calendar />
      </main>
    </>
  );
}

export default MyanmarCalendar2;
