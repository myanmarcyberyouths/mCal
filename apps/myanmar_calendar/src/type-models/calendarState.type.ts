export enum CalendarMode {
  WEEK = "W",
  MONTH = "M",
  YEAR = "Y",
}

export enum Language {
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

export type EventCalendarItem = {
  id: string;
  name: string;
  description: string;
  tagColor: string;
  checked: boolean;
  showOnList: boolean;
};

export type UserCalendarItem = {
  id: string;
  name: string;
  description?: string;
  tagColor: string;
  checked: boolean;
  showOnList: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserCalendarEvent = {
  gregorianBased: Record<string, string> | null;
  mmBased: Record<string, string> | null;
  others: { (date: Date): string }[] | null;
};
