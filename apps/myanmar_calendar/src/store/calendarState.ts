import { ActiveDateFrameT, CALENDAR_MODE_ENUM, CellPreferanceT, LANGUAGE_ENUM } from "@/type-models/calendarState.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Duration, add } from "date-fns";

export interface CalendarStateInterface {
  calendarMode: CALENDAR_MODE_ENUM;
  activeDate: string;
  calendarLanguage: LANGUAGE_ENUM;
  monthCellProps: CellPreferanceT;
  eventCalendars: Record<string, boolean>;
}

const initialState: CalendarStateInterface = {
  calendarMode: CALENDAR_MODE_ENUM.MONTH,
  activeDate: new Date().toISOString(),
  calendarLanguage: LANGUAGE_ENUM.ENGLISH,
  monthCellProps: {
    moonPhase: true,
    astro: true,
  },
  eventCalendars: {
    publicHolidays: true,
    myanmar: true,
    international: true,
    mon: true,
    shan: true,
    karen: true,
    kachin: true,
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

    updateMonthCellPropsState: (state, { payload }: PayloadAction<{ cellProp: string; value: boolean }>) => {
      state.monthCellProps[payload.cellProp] = payload.value;
      // state.monthCellProps = {
      //   ...state.monthCellProps,
      //   ...payload,
      // };
    },

    updateEventCalendars: (state, { payload }: PayloadAction<{ event: string; value: boolean }>) => {
      state.eventCalendars[payload.event] = payload.value;
    },
  },
});

export const { setCalendarMode, setActiveDate, updateActiveDate, setCalendarLanguage, updateMonthCellPropsState, updateEventCalendars } = calendarSlice.actions;

export default calendarSlice.reducer;
