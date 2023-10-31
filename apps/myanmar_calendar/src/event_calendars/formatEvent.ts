import { EventCalendarItem } from "@/type-models/calendarState.type";
import { format, getDate, getWeekOfMonth } from "date-fns";
import { EVENTS, CustomEventFnT } from "./event_calendars";
import { englishToMyanmarDate } from "burma-calendar";

export function getDayEvents(date: Date, eventCalendars: EventCalendarItem[]) {
  return eventCalendars.map((calendar) => {
    const currentEvent = EVENTS[calendar.id];

    const gregorianEvents = readGregorianEvents(date, currentEvent?.gregorianBased);
    const mmEvents = readMmEvents(date, currentEvent?.mmBased);
    const customEvents = readCustomEvents(date, currentEvent?.custom);

    return {
      ...calendar,
      events: [...gregorianEvents, ...mmEvents, ...customEvents],
    };
  });
}

function readGregorianEvents(date: Date, eventObj?: Record<string, string>) {
  let events: string[] = [];
  if (!eventObj) return events;

  const day = format(date, "MMM dd yyyy");
  const weekday = format(date, "MMM dd yyyy");
  const dayAnnually = format(date, "MMM dd");
  const weekdayAnnually = format(date, "MMM iii") + " " + getWeekOfMonth(date);
  const dayMonthly = getDate(date);
  const weekdayMonthly = format(date, "ccc") + " " + getWeekOfMonth(date);
  const weekdayWeekly = format(date, "ccc");

  // console.log(weekday, dayAnnually, weekdayAnnually, dayMonthly, weekdayMonthly, weekdayWeekly);

  eventObj[day] && events.push(eventObj[day]);
  eventObj[weekday] && events.push(eventObj[day]);
  eventObj[dayAnnually] && events.push(eventObj[dayAnnually]);
  eventObj[weekdayAnnually] && events.push(eventObj[weekdayAnnually]);
  eventObj[dayMonthly] && events.push(eventObj[dayMonthly]);
  eventObj[weekdayMonthly] && events.push(eventObj[weekdayMonthly]);
  eventObj[weekdayWeekly] && events.push(eventObj[weekdayWeekly]);

  return events;
}

function readMmEvents(date: Date, eventObj?: Record<string, string>) {
  let events: string[] = [];

  if (!eventObj) return events;

  let mmDate = englishToMyanmarDate(date);

  const moonAlignedDay = mmDate.month + mmDate.moonPhase;
  const noneMoonAlignedDay = mmDate.month + mmDate.moonPhase + " " + mmDate.date;

  if (eventObj[moonAlignedDay]) events.push(eventObj[moonAlignedDay]);
  if (eventObj[noneMoonAlignedDay]) events.push(eventObj[noneMoonAlignedDay]);
  if (eventObj[mmDate.thingyan]) events.push(eventObj[mmDate.thingyan]);

  return events;
}

function readCustomEvents(date: Date, eventFns?: CustomEventFnT) {
  if (!eventFns) return [];

  return eventFns
    .reduce((prev, eventFn) => {
      const event = eventFn(date);
      if (event) prev.push(event);
      return prev;
    }, [])
    .flat();
}
