// import { EventCalendarItem } from "@/type-models/calendarState.type";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface EventCalendarStateInterface {
//   eventCalendars: EventCalendarItem;
//   userCalendars: EventCalendarItem;
// }

// const initialState: EventCalendarStateInterface = {
//   eventCalendars: {
//     myanmarEvents: {
//       name: "Myanmar events",
//       checked: true,
//       tagColor: "#8b5cf6",
//     },
//     publicHolidays: {
//       name: "Public holidays",
//       checked: true,
//       tagColor: "#059669",
//     },
//     international: {
//       name: "International",
//       checked: true,
//       tagColor: "#0ea5e9",
//     },
//   },
//   userCalendars: {
//     myanmarEvents: {
//       name: "Myanmar events",
//       checked: true,
//       tagColor: "#8b5cf6",
//     },
//     publicHolidays: {
//       name: "Public holidays",
//       checked: true,
//       tagColor: "#059669",
//     },
//     international: {
//       name: "International",
//       checked: true,
//       tagColor: "#0ea5e9",
//     },
//   },
// };

// export const eventCalendarSlice = createSlice({
//   name: "eventCalendar",
//   initialState,
//   reducers: {
//     setEventCalendars: (state, { payload }: PayloadAction<EventCalendarItem>) => {
//       state.eventCalendars = payload;
//     },
//     updateEventCalendars: (state, { payload }: PayloadAction<{ event: string; value: boolean }>) => {
//       state.eventCalendars[payload.event].checked = payload.value;
//     },
//     setUserCalendars: (state, { payload }: PayloadAction<EventCalendarItem>) => {
//       state.userCalendars = payload;
//     },
//     updateUserCalendars: (state, { payload }: PayloadAction<{ event: string; value: boolean }>) => {
//       state.userCalendars[payload.event].checked = payload.value;
//     },
//   },
// });

// export const { setEventCalendars, updateEventCalendars, setUserCalendars, updateUserCalendars } = eventCalendarSlice.actions;

// export default eventCalendarSlice.reducer;
