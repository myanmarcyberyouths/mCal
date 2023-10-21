export const WEEK_DAYS = {
  sun: { long: "sunday", short: "sun" },
  mon: { long: "monday", short: "mon" },
  tue: { long: "tuesday", short: "tue" },
  wed: { long: "wednesday", short: "wed" },
  thu: { long: "thurday", short: "thu" },
  fri: { long: "friday", short: "fri" },
  sat: { long: "saturday", short: "sat" },
};

export const CALENDAR_MODE = {
  W: "week",
  M: "month",
  Y: "year",
};

export const LANGUAGES = {
  english: {
    label: "english",
    tagColor: "",
    index: 0,
  },
  myanmar: {
    label: "myanmar",
    tagColor: "",
    index: 1,
  },
  mon: {
    label: "mon",
    tagColor: "",
    index: 3,
  },
  shan: {
    label: "shan",
    tagColor: "",
    index: 4,
  },
  karen: {
    label: "karen",
    tagColor: "",
    index: 5,
  },
  // kachin: {
  //   label: "kachin",
  //   tagColor: "",
  //   index: 6,
  // },
} as const;

export const MIN_WIDTHS = {
  sm: 440, // ts default
  sm1: 540,
  sm2: 640,
  md: 768, // ts default
  md1: 800,
  md2: 920,
  md3: 980,
  lg: 1024, // ts default
  lg1: 1064,
  lg2: 1165,
  lg3: 1220,
  xl: 1280, // ts default
  xl1: 1380,
  xl2: 1450,
  xl3: 1536,
};

export const EVENT_CALENDARS = {
  myanmarEvents: {
    label: "mon",
    // tagColor: "#d97706", // indigo
    tagColor: "#8b5cf6",
  },
  publicHolidays: {
    label: "public holidays",
    tagColor: "#059669", //green
    // tagColor: "#f43f5e", //rose
  },
  international: {
    label: "mon",
    tagColor: "#0ea5e9",
    // tagColor: "#039be5",
  },
  mon: {
    label: "mon",
    tagColor: "#f6bf26",
  },
  shan: {
    label: "shan",
    tagColor: "#d81b60",
  },
  karen: {
    label: "karen",
    tagColor: "#007b83",
  },
  kachin: {
    label: "kachin",
    tagColor: "#9e69af",
  },
} as const;
