# Adding Event Calendar

Adding an event calendar to this application is a straightforward process. This guide will walk you through each step.

## 1. Configuration

- Open the `apps/myanmar_calendar/src/event_calendars/event_calendars.ts` file.
- Add a new calendar object to the `EVENT_CALENDARS` array. Be sure to assign an incremented `id` based on the last added calendar.
  Example:

```js
  const EVENT_CALENDARS: [
    // ...existing calendars,
   {
    id: "4",
    name: "Your calendar",
    description: "",
    tagColor: "#8b5cf6",
    checked: true,
    showOnList: true
    }
  ]
```

## 2. Constructing event calendar object

- Within the `EVENTS` object, you will construct an object. The object's key name must be the `id` as defined in the [configuration](#1-configuration).
- For `gregorianBased` events, keys must be in following formats:

  > - `"Jan 05 2024"` - January 5 2024 (no repeat)
  > - `"Jan 05"` - January 5 (repeat annually)
  > - `"Jan Mon 1 2024"` - First Monday of January 2024 (no repeat)
  > - `"Jan Sun 2"` - Second Sunday of January (repeat annually)
  > - `"5"` - 5th day of a month (repeat monthly)
  > - `"Mon"` - Monday (repeat weekly)
  > - `"Sun 2"` - Second Sunday of a month (repeat monthly)

- For 'mmBased' events, keys must be in following formats

  > - `တပေါင်းလပြည့်` - Full moon of Thabaung
  > - `တပေါင်းလဆန်း 1` - Waxing day 1 of Thabaung
  > - `သင်္ကြန်အကြိုနေ့` - သင်္ကြန်အကြိုနေ့

- For events that cannot be formatted with either the Gregorian or Myanmar calendar, you can include event calculator functions inside the `custom` array. These functions must accept a date parameter and return either a single string or an array of strings to represent the event.

Example:

```js
const EVENTS = {
  4: {
    gregorianBased: {
      "Jan 01": "နိုင်ငံတကာနှစ်သစ်ကူးနေ့",
      "Jan Sun 1": "First Sunday of Jan",
      "Jan 04": "လွတ်လပ်ရေးနေ့",
      "Feb 12": "ပြည်‌ထောင်စုနေ့",
    },
    mmBased: {
      တပေါင်းလပြည့်: "တပေါင်းပွဲတော်",
      ကဆုန်လပြည့်: "‌‌ညောင်ရေသွန်းပွဲတော်",
      ဝါဆိုလပြည့်: "ဓမ္မစကြာနေ့",
      သင်္ကြန်အကြိုနေ့: "သင်္ကြန်အကြိုနေ့",
    },
    custom: [
      (date: Date) => {
        const easterDate = calculateEasterDate(new Date(date).getFullYear());
        if (isSameDay(date, easterDate)) return "အီစတာပွဲတော်နေ့";
      },
    ],
  },
};
```

You are now all set!
