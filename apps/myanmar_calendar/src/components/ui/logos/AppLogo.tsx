import React from "react";
import {BsCalendar2Check} from "react-icons/bs";

function AppLogo() {
    return (
        <div className="flex items-center gap-3">
            <h1 className="text-[1.8rem] text-gray-500">mCal</h1>

            {/* Hidden markups */}
            <h2 className="hidden">Myanmar Calendar</h2>
            <h2 className="hidden">မြန်မာ ပြက္ကဒိန်</h2>
            <h2 className="hidden">မြန်မာပြက္ကဒိန်</h2>
        </div>
    );
}

export default AppLogo;
