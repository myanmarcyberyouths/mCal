import { eventDateReader } from "@/utils/eventDateReader";
import { format } from "date-fns";

const PUBLIC_HOLIDAYS = {
  "Jan 01": "နိုင်ငံတကာနှစ်သစ်ကူးနေ့",
  "Jan 1st Sun": "First sunday of Jan",
  "Jan 04": "လွတ်လပ်ရေးနေ့",
  "Feb 12": "ပြည်‌ထောင်စုနေ့",
  "Mar 02": "တောင်သူလယ်သမားနေ့",
  "Mar 27": "တပ်မတော်နေ့",
  "May 01": "အလုပ်သမားနေ့",
  "Jul 19": "အာဇာနည်နေ့",
  "Dec 07": "အမျိုးသားနေ့",
  "Dec 25": "ခရစ္စမတ်နေ့",
};

export default function public_holidays(engDate: Date, myanmarDate) {
  const events: string[] = eventDateReader(engDate, PUBLIC_HOLIDAYS);

  // Thingyan holiday
  if (myanmarDate.thingyan) events.push("နှစ်သစ်ကူးရုံးပိတ်ရက်");

  // Thadingyut holiday
  if (myanmarDate.month === "သီတင်းကျွတ်") {
    if (myanmarDate.moonPhase === "လပြည့်" || (myanmarDate.moonPhase === "လဆုတ်" && myanmarDate.date === 1) || (myanmarDate.moonPhase === "လဆန်း" && myanmarDate.date === 14))
      events.push("သီတင်းကျွတ်ရုံးပိတ်ရက်");
  }
  return events;
}
