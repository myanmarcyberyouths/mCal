import {setSidebarOpenState} from "@/store/systemState";
import React from "react";
import {IoMdMenu} from "react-icons/io";
import {useDispatch} from "react-redux";

function SidebarToggleBtn({children}: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const toggleSidebarOpen = () => {
        dispatch(setSidebarOpenState());
    };

    return (
        <div
            onClick={toggleSidebarOpen}
        >
            {children}
        </div>
    );
}

export default SidebarToggleBtn;
