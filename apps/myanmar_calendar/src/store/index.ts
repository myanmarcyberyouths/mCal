import { configureStore, combineReducers } from "@reduxjs/toolkit";

import calendarState from "./calendarState";
import systemState from "./systemState";

export const store = configureStore({
  reducer: {
    calendarState,
    systemState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
