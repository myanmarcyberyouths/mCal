const MYANMAR_EVENTS = {
  တပေါင်းလပြည့်: "တပေါင်းပွဲတော်",
  ကဆုန်လပြည့်: "‌‌ညောင်ရေသွန်းပွဲတော်",
  ဝါဆိုလပြည့်: "ဓမ္မစကြာနေ့",
  ဒုဝါဆိုလပြည့်: "ဓမ္မစကြာနေ့",
  သီတင်းကျွတ်လပြည့်: "အဘိဓမ္မာနေ့",
  တန်ဆောင်မုန်းလပြည့်: "တန်ဆောင်တိုင်ပွဲတော်",
};

export default function myanmar_events(engDate: Date, myanmarDate) {
  let events: string[] = [];

  MYANMAR_EVENTS[myanmarDate.month + myanmarDate.moonPhase] && events.push(MYANMAR_EVENTS[myanmarDate.month + myanmarDate.moonPhase]);

  if (myanmarDate.thingyan) events.push(myanmarDate.thingyan);

  return events;
}
