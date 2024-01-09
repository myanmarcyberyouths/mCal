import { EventCalendarItem } from "@/type-models/calendarState.type";
import { calculateEasterDate } from "@/utils/dateTimeHelper";
import { add, isSameDay } from "date-fns";

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
    custom: [],
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
    custom: [],
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
        const isGoodFriday = isSameDay(add(easterDate, { days: -2 }), date);

        if (isSameDay(date, easterDate)) events.push("အီစတာပွဲတော်နေ့");
        if (isGoodFriday) events.push("သောကြာနေ့ကြီး");

        return events;
      },
    ],
  },
};
