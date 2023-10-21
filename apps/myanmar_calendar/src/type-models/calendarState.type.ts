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

export type ActiveDateFrameT = {
  t: string;
  d: number;
  m: number;
  y: number;
};

export type EventCalendarsT = {
  publicHolidays: boolean;
  myanmarEvents: boolean;
  international: boolean;
  mon: boolean;
  shan: boolean;
  karen: boolean;
  kachin: boolean;
};
