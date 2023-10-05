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

export interface ActiveDateFrameT {
  t: string;
  d: number;
  m: number;
  y: number;
}
