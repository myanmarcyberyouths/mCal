import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SystemStateInterface {
  sidebarOpen: boolean;
  darkModeOn: boolean;
}

const initialState: SystemStateInterface = {
  sidebarOpen: true,
  darkModeOn: false,
};

export const systemSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setSidebarOpenState: (state, { payload }: PayloadAction<boolean>) => {
      state.sidebarOpen = payload;
    },
  },
});

export const { setSidebarOpenState } = systemSlice.actions;

export default systemSlice.reducer;
