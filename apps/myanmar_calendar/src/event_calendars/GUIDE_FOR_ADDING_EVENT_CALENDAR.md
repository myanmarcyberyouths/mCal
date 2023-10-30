# Adding Event Calendar

Adding an event calendar to this application is a straightforward process. This guide will walk you through each step.

## 1. Configuration

- Open the `apps/myanmar_calendar/src/event_calendars/event_calendars.ts` file.
- Add a calendar object to the `EVENT_CALENDARS` object (Please asign incremented id from last calendar)
  Example:

```js
  const EVENT_CALENDARS: [
    // ...existing calendars,
    id: "4",
    name: "Your calendar",
    description: "",
    tagColor: "#8b5cf6",
    checked: true,
    showOnList: true,
  ]
```

## 2. Constructing event calendar object

- Within `EVENTS` object, construct an object (key name must be the calendar id [see above](#1-configuration))
- For `gregorianBased` events, keys must be in following formats:

  > - `"Jan 05 2024"` - January 5 2024 (no repeat)
  > - `"Jan Mon 1 2024"` - First Monday of January 2024 (no repeat)
  > - `"Jan 05"` - January 5 (repeat annually)
  > - `"Jan Sun 2"` - Second Sunday of January (repeat annually)
  > - `"5"` - 5th day of a month (repeat monthly)
  > - `"Sun 2"` - Second Sunday of a month (repeat monthly)
  > - `"Mon"` - Monday (repeat weekly)

- For 'mmBased' events, keys must be in following formats

  > - `တပေါင်းလပြည့်` - Full moon of Thabaung
  > - `တပေါင်းလဆန်း 1` - Waxing day 1 of Thabaung
  > - `သင်္ကြန်အကြိုနေ့` - သင်္ကြန်အကြိုနေ့

- For events which are simply not formattable with Gregorian or Myanmar calendar, you can add event calculator function inside `others` array. The function must accept a date parameter and return a string.

Example:

```js
const EVENTS = {
  calendarId: {
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
    },
    others: [
      (date: Date) => {
        const easterDate = calculateEasterDate(new Date(date).getFullYear());
        if (isSameDay(date, easterDate)) return "အီစတာပွဲတော်နေ့";
      },
    ],
  },
};
```

You are now all set!
