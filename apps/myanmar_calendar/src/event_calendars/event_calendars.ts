import { EventCalendarItem } from "@/type-models/calendarState.type";
import { calculateEasterDate } from "@/utils/dateTimeHelper";
import {add, getYear, isSameDay} from "date-fns";

export const EVENT_CALENDARS: EventCalendarItem[] = [
  {
    id: "1",
    name: "Myanmar events",
    description: "",
    tagColor: "#8b5cf6",
    checked: true,
    showOnList: true,
  },
  {
    id: "2",
    name: "Public holidays",
    description: "",
    tagColor: "#059669",
    checked: true,
    showOnList: true,
  },
  {
    id: "3",
    name: "International",
    description: "",
    tagColor: "#0ea5e9",
    checked: true,
    showOnList: true,
  },
];

export type CustomEventFnT = { (date: Date): string | string[] }[];

type EventObjectT = {
  gregorianBased: Record<string, string | string[]> | null;
  mmBased: Record<string, string | string[]> | null;
  custom: CustomEventFnT | null;
};

type EventsT = Record<string, EventObjectT>;

export const EVENTS: EventsT = {
  "1": {
    gregorianBased: null,
    mmBased: {
      တပေါင်းလပြည့်: "တပေါင်းပွဲတော်",
      ကဆုန်လပြည့်: "‌‌ညောင်ရေသွန်းပွဲတော်",
      ဝါဆိုလပြည့်: "ဓမ္မစကြာနေ့",
      ဒုဝါဆိုလပြည့်: "ဓမ္မစကြာနေ့",
      သီတင်းကျွတ်လပြည့်: "အဘိဓမ္မာနေ့",
      တန်ဆောင်မုန်းလပြည့်: "တန်ဆောင်တိုင်ပွဲတော်",
      သင်္ကြန်အကြိုနေ့: "သင်္ကြန်အကြိုနေ့",
      သင်္ကြန်အကျနေ့: "သင်္ကြန်အကျနေ့",
      သင်္ကြန်အကြတ်နေ့: "သင်္ကြန်အကြတ်နေ့",
      သင်္ကြန်အတက်နေ့: "သင်္ကြန်အတက်နေ့",
      နှစ်ဆန်းတစ်ရက်နေ့: "နှစ်ဆန်းတစ်ရက်နေ့",
    },
    custom: [

    ],
  },

  "2": {
    gregorianBased: {
      "Jan 01": "နိုင်ငံတကာနှစ်သစ်ကူးနေ့",
      "Jan 04": "လွတ်လပ်ရေးနေ့",
      "Feb 12": "ပြည်‌ထောင်စုနေ့",
      "Mar 02": "တောင်သူလယ်သမားနေ့",
      "Mar 27": "တပ်မတော်နေ့",
      "May 01": "အလုပ်သမားနေ့",
      "Jul 19": "အာဇာနည်နေ့",
      "Dec 07": "အမျိုးသားနေ့",
      "Dec 25": "ခရစ္စမတ်နေ့",
    },
    mmBased: {
      "ပြာသိုလဆန်း 1": "ကရင်နှစ်သစ်ကူးနေ့",
      သီတင်းကျွတ်လပြည့်: "သီတင်းကျွတ်ရုံးပိတ်ရက်",
      "သီတင်းကျွတ်လဆန်း 14": "သီတင်းကျွတ်ရုံးပိတ်ရက်",
      "သီတင်းကျွတ်လဆုတ် 1": "သီတင်းကျွတ်ရုံးပိတ်ရက်",
      သင်္ကြန်အကြိုနေ့: "နှစ်သစ်ကူးရုံးပိတ်ရက်",
      သင်္ကြန်အကျနေ့: "နှစ်သစ်ကူးရုံးပိတ်ရက်",
      သင်္ကြန်အကြတ်နေ့: "နှစ်သစ်ကူးရုံးပိတ်ရက်",
      သင်္ကြန်အတက်နေ့: "နှစ်သစ်ကူးရုံးပိတ်ရက်",
      နှစ်ဆန်းတစ်ရက်နေ့: "နှစ်သစ်ကူးရုံးပိတ်ရက်",
    },
    custom: [
      // ** source: https://stackoverflow.com/questions/55023376/how-can-i-calculate-the-date-of-chinese-new-year-in-javascript
      (date: Date) => {
        function get_new_moons (date: Date) {
          const LUNAR_MONTH = 29.5305888531  // https://en.wikipedia.org/wiki/Lunar_month
          let y = date.getFullYear()
          let m = date.getMonth() + 1  // https://stackoverflow.com/questions/15799514/why-does-javascript-getmonth-count-from-0-and-getdate-count-from-1
          let d = date.getDate()
          // https://www.subsystems.us/uploads/9/8/9/4/98948044/moonphase.pdf
          if(m <= 2) {
            y -= 1
            m += 12
          }
          let a = Math.floor(y / 100)
          let b = Math.floor(a / 4)
          let c = 2 - a + b
          let e = Math.floor(365.25 * (y + 4716))
          let f = Math.floor(30.6001 * (m + 1))
          let julian_day = c + d + e + f - 1524.5
          let days_since_last_new_moon = julian_day - 2451549.5
          let new_moons = days_since_last_new_moon / LUNAR_MONTH
          let days_into_cycle = (new_moons % 1) * LUNAR_MONTH
          return new_moons
        }

        function in_chinese_new_year (date: Date) {
          /* The date is decided by the Chinese Lunar Calendar, which is based on the
          cycles of the moon and sun and is generally 21–51 days behind the Gregorian
          (internationally-used) calendar. The date of Chinese New Year changes every
          year, but it always falls between January 21st and February 20th. */
          return Math.floor(get_new_moons(date)) > Math.floor(get_new_moons(new Date(date.getFullYear(), 0, 20))) ? 1 : 0
        }

        function get_chinese_new_year (gregorian_year) {
          for(let i = 0; i <= 30; ++i) {
            let start = new Date(gregorian_year, 0, 1)
            start.setDate(21 + i)
            if(in_chinese_new_year(start)) return start
          }
        }

        const isChineseNewYearDay = isSameDay(get_chinese_new_year(getYear(date)), date)

        if(isChineseNewYearDay) return 'တရုတ်နှစ်သစ်ကူးနေ့'

      }
    ],
  },

  "3": {
    gregorianBased: {
      "Jan 01": "နှစ်သစ်ကူးနေ့",
      "Feb 14": "ဗယ်လင်တိုင်းနေ့",
      "Mar 08": "ကမ္ဘာ့အမျိုးသမ္မီးများနေ့",
      "Apr 04": "ကမ္ဘာ့ကျန်းမာရေးနေ့",
      "Apr 22": "ကမ္ဘာမြေနေ့",
      "May 12": "အမေများနေ့",
      "Jun 05": "ကမ္ဘာ့ပတ်ဝန်းကျင်နေ့",
      "Jun 16": "အဖေများနေ့",
      "Oct 31": "ဟယ်လိုဝင်းပွဲတော်",
      "Dec 24": "ခရစ္စမတ်အကြိုနေ့",
      "Dec 25": "ခရစ္စမတ်နေ့",
      "Dec 31": "နှစ်သစ်ကူးအကြိုနေ့",
    },
    mmBased: null,
    custom: [
      (date: Date) => {
        const events: string[] = [];
        const easterDate = calculateEasterDate(new Date(date).getFullYear());
        const isEasterDay = isSameDay(date, easterDate)
        const isGoodFriday = isSameDay(add(easterDate, { days: -2 }), date);

        if(isEasterDay) events.push("အီစတာပွဲတော်နေ့");
        if (isGoodFriday) events.push("သောကြာနေ့ကြီး");

        return events;
      },
    ],
  },
};
