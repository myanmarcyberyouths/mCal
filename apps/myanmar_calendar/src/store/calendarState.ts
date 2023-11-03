import { EVENT_CALENDARS } from "@/event_calendars/event_calendars";
import { CALENDAR_MODE_ENUM, CellPreferanceT, EventCalendarItem, LANGUAGE_ENUM, UserCalendarItem } from "@/type-models/calendarState.type";
import { CALENDAR_SHOW_DEFAULT } from "@/utils/defaults";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Duration, add } from "date-fns";

export interface CalendarStateInterface {
  calendarMode: CALENDAR_MODE_ENUM;
  activeDate: string;
  calendarLanguage: LANGUAGE_ENUM;
  show: CellPreferanceT;
  eventCalendars: EventCalendarItem[];
  userCalendars: UserCalendarItem[];
}

const initialState: CalendarStateInterface = {
  calendarMode: CALENDAR_MODE_ENUM.MONTH,
  activeDate: new Date().toISOString(),
  calendarLanguage: LANGUAGE_ENUM.MYANMAR,
  show: CALENDAR_SHOW_DEFAULT,
  eventCalendars: EVENT_CALENDARS,
  userCalendars: [],
};
export const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setCalendarMode: (state, action: PayloadAction<CALENDAR_MODE_ENUM>) => {
      state.calendarMode = action.payload;
    },
    setActiveDate: (state, { payload }: PayloadAction<string>) => {
      state.activeDate = payload;
    },
    updateActiveDate: (state, { payload }: PayloadAction<Duration>) => {
      state.activeDate = add(new Date(state.activeDate), payload).toISOString();
    },
    setCalendarLanguage: (state, action: PayloadAction<LANGUAGE_ENUM>) => {
      state.calendarLanguage = action.payload;
    },

    setCalendarShowState: (state, { payload }: PayloadAction<CellPreferanceT>) => {
      state.show = payload;
    },

    updateCalendarShowState: (state, { payload }: PayloadAction<{ cellProp: string; value: boolean }>) => {
      state.show[payload.cellProp] = payload.value;
    },

    setEventCalendars: (state, { payload }: PayloadAction<EventCalendarItem[]>) => {
      state.eventCalendars = payload;
    },
    updateEventCalendars: (state, { payload }: PayloadAction<{ id: string; checked: boolean; showOnList?: boolean }>) => {
      const calendarIndex = state.eventCalendars.findIndex((calendar) => calendar.id === payload.id);

      if (calendarIndex < 0) return;

      if (payload.showOnList === undefined) {
        state.eventCalendars[calendarIndex].checked = payload.checked;
      } else {
        state.eventCalendars[calendarIndex].showOnList = payload.showOnList;
        state.eventCalendars[calendarIndex].checked = payload.showOnList;
      }
    },
    setUserCalendars: (state, { payload }: PayloadAction<UserCalendarItem[]>) => {
      state.userCalendars = payload;
    },
    updateUserCalendars: (state, { payload }: PayloadAction<{ id: string; checked: boolean; showOnList?: boolean }>) => {
      const calendarIndex = state.userCalendars.findIndex((calendar) => calendar.id === payload.id);

      if (calendarIndex < 0) return;

      if (payload.showOnList === undefined) {
        state.userCalendars[calendarIndex].checked = payload.checked;
      } else {
        state.userCalendars[calendarIndex].showOnList = payload.showOnList;
        state.userCalendars[calendarIndex].checked = payload.showOnList;
      }
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
} = calendarSlice.actions;

export default calendarSlice.reducer;
