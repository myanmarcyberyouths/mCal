export const CALENDAR_SHOW_DEFAULT = {
  moonPhase: true,
  astroEvent: true,
};

export const USER_CALENDARS = [
  {
    id: "1",
    name: "Birthdays",
    description: "",
    tagColor: "#ff00ff",
    createdAt: "",
    updatedAt: "",
    events: {
      gregorianBased: {
        "Jan 01": "New Year",
      },
      mmBased: {},
      others: [() => {}],
    },
  },
];
