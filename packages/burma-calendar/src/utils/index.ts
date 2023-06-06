export type TDate = string | Date
export const toDate = (dateString: TDate) => {
    const date = new Date(dateString)
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        date,
        toDate,
    }
}
