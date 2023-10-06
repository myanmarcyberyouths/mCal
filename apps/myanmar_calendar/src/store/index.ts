import { configureStore, combineReducers } from "@reduxjs/toolkit";

import calendarState from "./calendarState";
import systemState from "./systemState";
import modelControlState from "./modelControlState";

export const store = configureStore({
  reducer: {
    calendarState,
    systemState,
    modelControlState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
