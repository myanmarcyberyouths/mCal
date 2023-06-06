import {ceMmTranslate} from "../algo/date_time";

const language = {
    english: 0,
    myanmar: 1,
    mon: 3,
    shan: 4,
    karen: 5,
}

type Language = Lowercase<keyof typeof language>

const translator = new ceMmTranslate()

export const i18n = <From extends Language, To extends Exclude<Language, From>>(content: string, from: From, to: To): string => {
    return translator.T(
        content,
        language[to],
        language[from]
    )
}

