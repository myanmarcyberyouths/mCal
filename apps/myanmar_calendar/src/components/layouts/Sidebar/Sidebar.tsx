import React from "react";
import { cn } from "@/lib/utils";
import LanguageSelectBox from "./LanguageSelectBox";

function Sidebar() {
  return (
    <section className={cn("flex-shrink-0 __scrollbar-sm p-3", `w-sidebar-w`)}>
      <div className="space-y-4">
        <div>
          <p className="text-[0.72rem] font-semibold text-gray-500 mb-[0.35rem]">CALENDAR LANGUAGE</p>
          <LanguageSelectBox />
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
