import { format, getDate, getWeekOfMonth } from "date-fns";

export function eventDateReader(date: Date, datedEvents: Record<string, string>) {
  let events: string[] = [];

  const day = format(date, "MMM dd yyyy");
  const weekday = format(date, "MMM dd yyyy");
  const dayAnnually = format(date, "MMM dd");
  const weekdayAnnually = format(date, "MMM iii") + " " + getWeekOfMonth(date);
  const dayMonthly = getDate(date);
  const weekdayMonthly = format(date, "ccc") + " " + getWeekOfMonth(date);
  const weekdayWeekly = format(date, "ccc");

  datedEvents[day] && events.push(datedEvents[day]);
  datedEvents[weekday] && events.push(datedEvents[day]);
  datedEvents[dayAnnually] && events.push(datedEvents[dayAnnually]);
  datedEvents[weekdayAnnually] && events.push(datedEvents[weekdayAnnually]);
  datedEvents[dayMonthly] && events.push(datedEvents[dayMonthly]);
  datedEvents[weekdayMonthly] && events.push(datedEvents[weekdayMonthly]);
  datedEvents[weekdayWeekly] && events.push(datedEvents[weekdayWeekly]);

  return events;
}
