import { calculateEasterDate } from "@/utils/calculateEasterDate";
import { eventDateReader } from "@/utils/eventDateReader";
import { add, format, isSameDay } from "date-fns";

const INTERNATIONNAL = {
  // "Jan 01": "New Year's Day",
  "Jan 01": "နှစ်သစ်ကူးနေ့",
  // "Feb 14": "Valentine's Day",
  "Feb 14": "ဗယ်လင်တိုင်းနေ့",
  // "Mar 08": "International Women's Day",
  "Mar 08": "ကမ္ဘာ့အမျိုးသမ္မီးများနေ့",
  // "Apr 04": "Word Health Day",
  "Apr 04": "ကမ္ဘာ့ကျန်းမာရေးနေ့",
  // "Apr 22": "Earth Day",
  "Apr 22": "ကမ္ဘာမြေနေ့",
  // "May 12": "Mother's Day",
  "May 12": "အမေများနေ့",
  // "Jun 05": "World Environment Day",
  "Jun 05": "ကမ္ဘာ့ပတ်ဝန်းကျင်နေ့",
  // "Jun 16": "Father's Day",
  "Jun 16": "အဖေများနေ့",
  // "Oct 31": "Halloween",
  "Oct 31": "ဟယ်လိုဝင်းပွဲတော်",
  // "Dec 24": "Christmas Eve",
  "Dec 24": "ခရစ္စမတ်အကြိုနေ့",
  // "Dec 25": "Christmas Day",
  "Dec 25": "ခရစ္စမတ်နေ့",
  // "Dec 31": "New Year Eve",
  "Dec 31": "နှစ်သစ်ကူးအကြိုနေ့",
};

export default function international(engDate: Date) {
  let events: string[] = [];

  // const month_day = format(engDate, "MMM dd");
  events.push(...eventDateReader(engDate, INTERNATIONNAL));

  let easterDate = calculateEasterDate(new Date(engDate).getFullYear());

  const isEasterDay = isSameDay(easterDate, engDate);
  const isGoodFriday = isSameDay(add(easterDate, { days: -2 }), engDate);

  isEasterDay && events.push("အီစတာပွဲတော်နေ့");
  isGoodFriday && events.push("သောကြာနေ့ကြီး");

  return events;
}
