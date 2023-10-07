import { LANGUAGE_ENUM } from "@/type-models/calendarState.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SystemStateInterface {
  sidebarOpen: boolean;
  darkModeOn: boolean;
  systemLanguage: LANGUAGE_ENUM;
}

const initialState: SystemStateInterface = {
  sidebarOpen: true,
  darkModeOn: false,
  systemLanguage: LANGUAGE_ENUM.ENGLISH,
};

export const systemSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setSidebarOpenState: (state, { payload }: PayloadAction<boolean | undefined>) => {
      state.sidebarOpen = payload || !state.sidebarOpen;
    },
    setSystemLanguage: (state, { payload }: PayloadAction<LANGUAGE_ENUM>) => {
      state.systemLanguage = payload;
    },
  },
});

export const { setSidebarOpenState, setSystemLanguage } = systemSlice.actions;

export default systemSlice.reducer;
