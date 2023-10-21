# Adding Event Calendar

Adding an event calendar to this application is simple. This guide will walk you through each step.

## 1. State Configuration

- Open `apps/myanmar_calendar/src/store/calendarState.ts` file.
- Add configuration object to `eventCalendars` object in `initialState` (**Key name must be in camel case**).

  Example:

```js
  eventCalendars: {
    // ...existing calendars,
   yourCalendar: {
    checked: true,
    tagColor: '#dd4454',
   }
  }
```

## 2. Constructing event calendar object

_Only for events, formatted based on Western calendar dates._

- Create a new file in `apps/myanmar_calendar/src/event_calendars` directory.
- Construct an object, containing key-value pairs of date(key) and event name(value).
- Keys must be in following formats:
  > - `"Jan 05 2024"` - January 5 2024 (no repeat)
  > - `"Jan Mon 1 2024"` - First Monday of January 2024 (no repeat)
  > - `"Jan 05"` - January 5 (repeat annually)
  > - `"Jan Sun 2"` - Second Sunday of January (repeat annually)
  > - `"5"` - 5th day of a month (repeat monthly)
  > - `"Sun 2"` - Second Sunday of a month (repeat monthly)
  > - `"Mon"` - Monday (repeat weekly)

Example:

```js
const YOUR_CALENDAR = {
  "Jan 01": "နိုင်ငံတကာနှစ်သစ်ကူးနေ့",
  "Jan Sun 1": "First Sunday of Jan",
  "Jan 04": "လွတ်လပ်ရေးနေ့",
  "Feb 12": "ပြည်‌ထောင်စုနေ့",
  // ... rest of the events,
};
```

## 3. Creating event reader function

My approach here is, we will transform the date into each of the formats listed [above](#2-constructing-event-calendar-object). Then read using the formatted dates from the event object.
Create a function that accept date and perform following steps.

> - Declare an empty array.
> - Format the accepted date into supported key format. [see here](#2-constructing-event-calendar-object).
> - Read event from the calendar object using the formatted date.
> - Return the array (events).

Example:

```js
export default function your_calendar(engDate: Date) {
  let events: string[] = [];

  // formatting date into supported format
  const month_day = format(engDate, "MMM dd");

  // Reading event from the created calendar object
  // If the date has any event, add it to the returning array
  YOUR_CALENDAR[month_day] && events.push(YOUR_CALENDAR[month_day]);

  // returning an array of events
  return events;
}
```

> You can also reference existing event calendars and customize as you prefer

## 4. Binding the calendar function to root function

- Open `apps/myanmar_calendar/src/event_calendars/index.ts` file.
- Import the constructed calendar function and asign it to `calendars` object (**key name must match with the key name used to configure in state `calendarState.ts`** - [See State Configuration](#1-state-configuration)).

You are all set!
