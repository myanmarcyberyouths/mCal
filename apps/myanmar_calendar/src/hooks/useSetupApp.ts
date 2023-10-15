import React, { useCallback } from "react";
import useWindowResize from "./useWindowResize";
import { MIN_WIDTHS } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setEnterMobileMode, setSidebarOpenState } from "@/store/systemState";

function useSetupApp() {
  const dispatch = useDispatch();

  // Browser Resize Handler, Responsive purpose
  useWindowResize(
    useCallback(() => {
      if (window.innerWidth < MIN_WIDTHS.sm2) {
        dispatch(setEnterMobileMode(true));
      }

      if (window.innerWidth >= MIN_WIDTHS.sm2) {
        dispatch(setEnterMobileMode(false));
      }

      if (window.innerWidth < MIN_WIDTHS.xl) {
        console.log("mid screen");
        dispatch(setSidebarOpenState(false));
      } else {
        dispatch(setSidebarOpenState(true));
      }
    }, [dispatch])
  );
}

export default useSetupApp;
