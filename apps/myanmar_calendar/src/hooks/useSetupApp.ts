import React, { useCallback, useEffect } from "react";
import useWindowResize from "./useWindowResize";
import { MIN_WIDTHS } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setEnterMobileMode, setSidebarOpenState } from "@/store/systemState";
import { useReadLocalStorage } from "./useReadLocalStorage";
import { LOCAL_STORAGE_KEYS } from "@/type-models/utils.type";
import {
  CellPreferanceT,
  EventCalendarItem,
} from "@/type-models/calendarState.type";
import { setCalendarShowState, setEventCalendars } from "@/store/calendarState";
import { CALENDAR_SHOW_DEFAULT } from "@/utils/defaults";
import { EVENT_CALENDARS } from "@/event_calendars/event_calendars";

function useSetupApp() {
  const dispatch = useDispatch();

  // Browser Resize Handler, Responsive purpose
  useWindowResize(
    useCallback(() => {
      if (window.innerWidth >= MIN_WIDTHS.sm2) {
        dispatch(setEnterMobileMode(false));
      } else {
        dispatch(setEnterMobileMode(true));
      }

      if (window.innerWidth < MIN_WIDTHS.xl) {
        console.log("mid screen");
        dispatch(setSidebarOpenState(false));
      } else {
        dispatch(setSidebarOpenState(true));
      }
    }, [dispatch]),
  );

  // Setting event calendar state with LocalStorage data
  const eventCalendars = useReadLocalStorage<EventCalendarItem[]>(
    LOCAL_STORAGE_KEYS.eventCalendars,
  );
  useEffect(() => {
    console.log(eventCalendars);
    dispatch(setEventCalendars(eventCalendars || EVENT_CALENDARS));
  }, [dispatch, eventCalendars]);

  // Setting calendar show state with LocalStorage data
  const calendarShow = useReadLocalStorage<CellPreferanceT>(
    LOCAL_STORAGE_KEYS.calendarShow,
  );
  useEffect(() => {
    dispatch(setCalendarShowState(calendarShow || CALENDAR_SHOW_DEFAULT));
  }, [dispatch, calendarShow]);
}
// eslint-disable-next-line react-hooks/exhaustive-deps

export default useSetupApp;
