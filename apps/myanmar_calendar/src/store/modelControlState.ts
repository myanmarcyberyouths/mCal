import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { add } from "date-fns";

interface ModelControlInterface {
  dayDialogTargetDay: string | null;
  newEventDialogTargetDay: string | null;
}

const initialState: ModelControlInterface = {
  dayDialogTargetDay: null,
  newEventDialogTargetDay: null,
};

export const modelControlSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    setDayDialongTargetDay: (
      state,
      { payload }: PayloadAction<string | null>,
    ) => {
      state.dayDialogTargetDay = payload;
    },
    updateDayDialongTargetDay: (
      state,
      { payload }: PayloadAction<Duration>,
    ) => {
      state.dayDialogTargetDay = add(
        new Date(state.dayDialogTargetDay),
        payload,
      ).toISOString();
    },

    setNewEventDialongTargetDay: (
      state,
      { payload }: PayloadAction<string | null>,
    ) => {
      state.newEventDialogTargetDay = payload;
    },
  },
});

export const {
  setDayDialongTargetDay,
  updateDayDialongTargetDay,
  setNewEventDialongTargetDay,
} = modelControlSlice.actions;

export default modelControlSlice.reducer;
