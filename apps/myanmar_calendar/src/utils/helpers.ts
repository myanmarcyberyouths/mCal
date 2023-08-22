import {utcToZonedTime} from "date-fns-tz";

export function getLocalTime(date: Date) {
    return utcToZonedTime(
        new Date(date),
        "Asia/Yangon"
    );
}
