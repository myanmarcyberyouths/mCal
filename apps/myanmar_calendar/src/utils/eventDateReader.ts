import { format, getDate, getWeekOfMonth } from "date-fns";

export function eventDateReader(date: Date, eventObj: Record<string, string>) {
  let events: string[] = [];

  const day = format(date, "MMM dd yyyy");
  const weekday = format(date, "MMM dd yyyy");
  const dayAnnually = format(date, "MMM dd");
  const weekdayAnnually = format(date, "MMM iii") + " " + getWeekOfMonth(date);
  const dayMonthly = getDate(date);
  const weekdayMonthly = format(date, "ccc") + " " + getWeekOfMonth(date);
  const weekdayWeekly = format(date, "ccc");

  eventObj[day] && events.push(eventObj[day]);
  eventObj[weekday] && events.push(eventObj[day]);
  eventObj[dayAnnually] && events.push(eventObj[dayAnnually]);
  eventObj[weekdayAnnually] && events.push(eventObj[weekdayAnnually]);
  eventObj[dayMonthly] && events.push(eventObj[dayMonthly]);
  eventObj[weekdayMonthly] && events.push(eventObj[weekdayMonthly]);
  eventObj[weekdayWeekly] && events.push(eventObj[weekdayWeekly]);

  return events;
}
