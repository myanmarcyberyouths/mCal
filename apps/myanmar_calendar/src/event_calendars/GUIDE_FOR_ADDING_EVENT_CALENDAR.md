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

1. Lets create a function that accept engDate & mmDate(optional).
2. Import `eventDateReader` function from `apps/myanmar_calendar/src/utils/eventDateReader.ts.
3. Pass engDate and event object you created to `eventDateReader` function. The function will return an array of events.
4. You can also manually add events which are not formatable based on English calendar.
   Example:

```js
export default function your_calendar(engDate: Date) {
  // eventDateReader function accept two params (date, evetObj)
  // It will format your date, read all matched events from the eventObj and finally return an array of events
  const events: string[] = eventDateReader(engDate, INTERNATIONNAL);

  // You can also manually add events which are not formatable based on English calendar.
  // Eg:
  let easterDate = calculateEasterDate(new Date(engDate).getFullYear());
  isSameDay(engDate, easterDate) && events.push("အီစတာပွဲတော်နေ့");

  // returning an array of events
  return events;
}
```

## 4. Binding the calendar to root function

- Open `apps/myanmar_calendar/src/event_calendars/index.ts` file.
- Import the constructed [calendar function](#3-creating-event-reader-function) and asign it to `calendars` object (**key name must match with the key name used to configure in React state `calendarState.ts`** - [See State Configuration](#1-state-configuration)).

You are all set!
