export enum CALENDAR_MODE_ENUM {
  WEEK = "W",
  MONTH = "M",
  YEAR = "Y",
}

export enum LANGUAGE_ENUM {
  MYANMAR = "myanmar",
  ENGLISH = "english",
  MON = "mon",
  SHAN = "shan",
  KAREN = "karen",
  KACHIN = "kachin",
}

export type CellPreferanceT = {
  moonPhase: boolean;
  astroEvent: boolean;
};

export type EventCalendarItem = Record<string, { name: string; checked: boolean; tagColor: string }>;
