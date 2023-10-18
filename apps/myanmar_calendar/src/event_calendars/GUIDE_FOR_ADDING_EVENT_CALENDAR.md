# Adding Event Calendar

Adding an event calendar to this application is a simple process. This guide will walk you through the process.

## 1. React Configuration

- Open `apps/myanmar_calendar/src/store/calendarState.ts` file.
- Add configuration object to initialState's `eventCalendars` object (**Key name must be in camel case**).
  Example:

```js
  eventCalendars: {
    // ...existing calendars,
   yourEventCalendar: {
    checked: true,
    tagColor: '#dd4454',
   }
  }
```

## 2. Constructing event calendar

> _Only for events formatted based on Western calendar dates_

- Create a new file in `apps/myanmar_calendar/src/event_calendars` directory.
- Construct an object containing key-value pairs of date(key) and event name(value).
- This method support two key(date) format, _date based_ and _weekday based_
  > - Date based key must be "MMM DD" (eg: `Jan 05` = January 5th).
  > - Weekday based key must be "MMM WWW weekNumberOfMonth" (eg: `Jan Sun 1` = First Sunday of January).

Example:

```js
const PUBLIC_HOLIDAYS = {
  "Jan 01": "နိုင်ငံတကာနှစ်သစ်ကူးနေ့",
  "Jan Sun 1": "Dummy event",
  "Jan 04": "လွတ်လပ်ရေးနေ့",
  "Feb 12": "ပြည်‌ထောင်စုနေ့",
  // ... rest of the events,
};
```

## 3. Binding the constructed calendar to root function

- Open `apps/myanmar_calendar/src/event_calendars/index.ts` file.
- Import the constructed calendar function and asign it to `calendars` object (**key name must match with the key name used to configure in React `calendarState.ts`** - [See React Configuration](#1-react-configuration)).
