import { englishToMyanmarDate } from "burma-calendar";
import public_holidays from "./public_holidays";
import myanmar_events from "./myanmar_events";
import international from "./international";

const calendars: Record<string, (engDate: Date, myanmarDate?: any) => string[]> = {
  myanmarEvents: myanmar_events,
  publicHolidays: public_holidays,
  international: international,
};

export default function event_calendars(date: Date, checkedCalendars: string[]) {
  const myanmarDate = englishToMyanmarDate(date);

  let events: { event: string[]; eventType: string }[] = [];

  checkedCalendars.forEach((calendar) => {
    let event = calendars[calendar] && calendars[calendar](date, myanmarDate);

    events.push({ event, eventType: calendar });
  });

  return events;
}
