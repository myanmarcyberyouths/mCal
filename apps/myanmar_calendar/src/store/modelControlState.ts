import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelControlInterface {
  dayDialogTargetDay: string | null;
}

const initialState: ModelControlInterface = {
  dayDialogTargetDay: null,
};

export const modelControlSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setDayDialongTargetDay: (state, { payload }: PayloadAction<string | null>) => {
      state.dayDialogTargetDay = payload;
    },
  },
});

export const { setDayDialongTargetDay } = modelControlSlice.actions;

export default modelControlSlice.reducer;
