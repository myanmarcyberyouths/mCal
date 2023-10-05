import { ActiveDateFrameT, CALENDAR_MODE_ENUM, LANGUAGE_ENUM } from "@/type-models/calendarState.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Duration, add } from "date-fns";

interface CalendarStateInterface {
  calendarMode: CALENDAR_MODE_ENUM;
  activeDateFrame: ActiveDateFrameT;
  activeDate: Date;
  calendarLanguage: LANGUAGE_ENUM;
}

const initialState: CalendarStateInterface = {
  calendarMode: CALENDAR_MODE_ENUM.MONTH,
  activeDateFrame: {
    t: "00:00:00",
    d: 1,
    m: 1,
    y: 1970,
  },
  activeDate: new Date(),
  calendarLanguage: LANGUAGE_ENUM.ENGLISH,
};
export const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setCalendarMode: (state, action: PayloadAction<CALENDAR_MODE_ENUM>) => {
      state.calendarMode = action.payload;
    },
    setActiveDateFrame: (state, action: PayloadAction<Partial<ActiveDateFrameT>>) => {
      state.activeDateFrame = {
        ...state.activeDateFrame,
        ...action.payload,
      };
    },
    updateActiveDateFrame: (state, { payload }: PayloadAction<{ target: "d" | "m" | "y"; action: "increment" | "decrement" }>) => {
      if (payload.action === "increment") {
        state.activeDateFrame[payload.target] = state.activeDateFrame[payload.target] + 1;
      }
      if (payload.action === "decrement") {
        state.activeDateFrame[payload.target] = state.activeDateFrame[payload.target] - 1;
      }
    },
    setActiveDate: (state, { payload }: PayloadAction<Date>) => {
      state.activeDate = payload;
    },
    updateActiveDate: (state, { payload }: PayloadAction<Duration>) => {
      state.activeDate = add(state.activeDate, payload);
    },
    setCalendarLanguage: (state, action: PayloadAction<LANGUAGE_ENUM>) => {
      state.calendarLanguage = action.payload;
    },
  },
});

export const { setCalendarMode, setActiveDateFrame, setActiveDate, updateActiveDate, setCalendarLanguage } = calendarSlice.actions;

export default calendarSlice.reducer;
