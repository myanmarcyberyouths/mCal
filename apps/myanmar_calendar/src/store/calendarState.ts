import { ActiveDateFrameT, CALENDAR_MODE_ENUM, CellPreferanceT, LANGUAGE_ENUM } from "@/type-models/calendarState.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Duration, add } from "date-fns";

interface CalendarStateInterface {
  calendarMode: CALENDAR_MODE_ENUM;
  activeDate: string;
  calendarLanguage: LANGUAGE_ENUM;
  cellPreferance: CellPreferanceT;
}

const initialState: CalendarStateInterface = {
  calendarMode: CALENDAR_MODE_ENUM.MONTH,
  activeDate: new Date().toISOString(),
  calendarLanguage: LANGUAGE_ENUM.ENGLISH,
  cellPreferance: {
    moonPhase: true,
    astro: true,
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

    setCalendarPreferance: (state, { payload }: PayloadAction<Partial<CellPreferanceT>>) => {
      state.cellPreferance = {
        ...state.cellPreferance,
        ...payload,
      };
    },
  },
});

export const { setCalendarMode, setActiveDate, updateActiveDate, setCalendarLanguage } = calendarSlice.actions;

export default calendarSlice.reducer;
