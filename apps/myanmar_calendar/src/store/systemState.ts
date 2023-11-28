import { Language } from "@/type-models/calendarState.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SystemStateInterface {
  sidebarOpen: boolean;
  darkModeOn: boolean;
  enterMobileMode: boolean;
  systemLanguage: Language;
}

const initialState: SystemStateInterface = {
  sidebarOpen: false,
  darkModeOn: false,
  enterMobileMode: false,
  systemLanguage: Language.ENGLISH,
};

export const systemSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setSidebarOpenState: (
      state,
      { payload }: PayloadAction<boolean | undefined>,
    ) => {
      state.sidebarOpen = payload === undefined ? !state.sidebarOpen : payload;
    },
    setSystemLanguage: (state, { payload }: PayloadAction<Language>) => {
      state.systemLanguage = payload;
    },
    setEnterMobileMode: (state, { payload }: PayloadAction<boolean>) => {
      state.enterMobileMode = payload;
    },
  },
});

export const { setSidebarOpenState, setSystemLanguage, setEnterMobileMode } =
  systemSlice.actions;

export default systemSlice.reducer;
