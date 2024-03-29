import { EVENT_CALENDARS } from "@/event_calendars/event_calendars";
import {
  CalendarMode,
  CellPreferanceT,
  EventCalendarItem,
  Language,
  UserCalendarItem,
} from "@/type-models/calendarState.type";
import { WEEK_DAYS } from "@/type-models/utils.type";
import { CALENDAR_SHOW_DEFAULT } from "@/utils/defaults";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Duration, add } from "date-fns";

export interface CalendarStateInterface {
  calendarMode: CalendarMode;
  activeDate: string;
  calendarLanguage: Language;
  show: CellPreferanceT;
  eventCalendars: EventCalendarItem[];
  userCalendars: UserCalendarItem[];
  timeZone: string;
  weekStart: WEEK_DAYS;
}

const initialState: CalendarStateInterface = {
  calendarMode: CalendarMode.MONTH,
  activeDate: new Date().toISOString(),
  calendarLanguage: Language.MYANMAR,
  show: CALENDAR_SHOW_DEFAULT,
  eventCalendars: EVENT_CALENDARS,
  userCalendars: [],
  timeZone: "Asia/Rangoon",
  weekStart: WEEK_DAYS.sun,
};
export const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setCalendarMode: (state, action: PayloadAction<CalendarMode>) => {
      state.calendarMode = action.payload;
    },
    setActiveDate: (state, { payload }: PayloadAction<string>) => {
      state.activeDate = payload;
    },
    updateActiveDate: (state, { payload }: PayloadAction<Duration>) => {
      state.activeDate = add(new Date(state.activeDate), payload).toISOString();
    },
    setCalendarLanguage: (state, action: PayloadAction<Language>) => {
      state.calendarLanguage = action.payload;
    },

    setCalendarShowState: (
      state,
      { payload }: PayloadAction<CellPreferanceT>,
    ) => {
      state.show = payload;
    },

    updateCalendarShowState: (
      state,
      { payload }: PayloadAction<{ cellProp: string; value: boolean }>,
    ) => {
      state.show[payload.cellProp] = payload.value;
    },

    setEventCalendars: (
      state,
      { payload }: PayloadAction<EventCalendarItem[]>,
    ) => {
      state.eventCalendars = payload;
    },
    updateEventCalendars: (
      state,
      {
        payload,
      }: PayloadAction<{ id: string; checked: boolean; showOnList?: boolean }>,
    ) => {
      const calendarIndex = state.eventCalendars.findIndex(
        (calendar) => calendar.id === payload.id,
      );

      if (calendarIndex < 0) return;

      if (payload.showOnList === undefined) {
        state.eventCalendars[calendarIndex].checked = payload.checked;
      } else {
        state.eventCalendars[calendarIndex].showOnList = payload.showOnList;
        state.eventCalendars[calendarIndex].checked = payload.showOnList;
      }
    },
    setUserCalendars: (
      state,
      { payload }: PayloadAction<UserCalendarItem[]>,
    ) => {
      state.userCalendars = payload;
    },
    updateUserCalendars: (
      state,
      {
        payload,
      }: PayloadAction<{ id: string; checked: boolean; showOnList?: boolean }>,
    ) => {
      const calendarIndex = state.userCalendars.findIndex(
        (calendar) => calendar.id === payload.id,
      );

      if (calendarIndex < 0) return;

      if (payload.showOnList === undefined) {
        state.userCalendars[calendarIndex].checked = payload.checked;
      } else {
        state.userCalendars[calendarIndex].showOnList = payload.showOnList;
        state.userCalendars[calendarIndex].checked = payload.showOnList;
      }
    },
    setTimeZone: (state, { payload }: PayloadAction<string>) => {
      state.timeZone = payload;
    },
    setWeekStart: (state, { payload }: PayloadAction<WEEK_DAYS>) => {
      state.weekStart = payload;
    },
  },
});

export const {
  setCalendarMode,
  setActiveDate,
  updateActiveDate,
  setCalendarLanguage,
  setCalendarShowState,
  updateCalendarShowState,
  setEventCalendars,
  updateEventCalendars,
  setUserCalendars,
  updateUserCalendars,
  setTimeZone,
  setWeekStart,
} = calendarSlice.actions;

export default calendarSlice.reducer;
