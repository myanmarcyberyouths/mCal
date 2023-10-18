import { ActiveDateFrameT, CALENDAR_MODE_ENUM, CellPreferanceT, LANGUAGE_ENUM } from "@/type-models/calendarState.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Duration, add } from "date-fns";

export interface CalendarStateInterface {
  calendarMode: CALENDAR_MODE_ENUM;
  activeDate: string;
  calendarLanguage: LANGUAGE_ENUM;
  preferance: CellPreferanceT;
  eventCalendars: Record<string, { checked: boolean; tagColor: string }>;
}

const initialState: CalendarStateInterface = {
  calendarMode: CALENDAR_MODE_ENUM.MONTH,
  activeDate: new Date().toISOString(),
  calendarLanguage: LANGUAGE_ENUM.MYANMAR,
  preferance: {
    moonPhase: true,
    astroEvent: true,
  },
  eventCalendars: {
    myanmarEvents: {
      checked: true,
      tagColor: "#8b5cf6",
    },
    publicHolidays: {
      checked: true,
      tagColor: "#059669",
    },
    international: {
      checked: true,
      tagColor: "#0ea5e9",
    },
  },
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

    updateCalendarPreferanceState: (state, { payload }: PayloadAction<{ cellProp: string; value: boolean }>) => {
      state.preferance[payload.cellProp] = payload.value;
    },

    updateEventCalendars: (state, { payload }: PayloadAction<{ event: string; value: boolean }>) => {
      state.eventCalendars[payload.event].checked = payload.value;
    },
  },
});

export const { setCalendarMode, setActiveDate, updateActiveDate, setCalendarLanguage, updateCalendarPreferanceState, updateEventCalendars } = calendarSlice.actions;

export default calendarSlice.reducer;
