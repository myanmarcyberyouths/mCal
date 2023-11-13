import { engToMm } from "../algo/myanamar_calendar";
import { TDate, toDate } from "../utils";

export const englishToMyanmarDate = (dateString: TDate) => {
  const { month, year, date } = toDate(dateString);
  return engToMm(year, month, date.getDate());
};
