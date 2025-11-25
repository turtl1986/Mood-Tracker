import type {ArrayMood, IGroupMood, MonthSeasonInfo} from "./utils/interface.tsx";

export const arrayMood : ArrayMood[] = [
    {
        name: "Очень плохо",
        emoji: "😭",
        color: "#E74C3C"
    },
    {
        name: "Плохо",
        emoji: "😞",
        color: "#E67E22"
    },
    {
        name: "Нормально",
        emoji: "🙂",
        color: "#F1C40F"
    },
    {
        name: "Хорошо",
        emoji: "😊",
        color: "#2ECC71"
    },
    {
        name: "Отлично",
        emoji: "🤩",
        color: "#27AE60"
    }
];

export const monthsWithSeason: MonthSeasonInfo[] = [
    {
        name: "Январь",
        monthNumber: 1,
        season: "winter",
        seasonEmoji: "❄️",
        key: "1",
    },
    {
        name: "Февраль",
        monthNumber: 2,
        season: "winter",
        seasonEmoji: "❄️",
        key: "2",
    },
    {
        name: "Март",
        monthNumber: 3,
        season: "spring",
        seasonEmoji: "🌷",
        key: "3",
    },
    {
        name: "Апрель",
        monthNumber: 4,
        season: "spring",
        seasonEmoji: "🌷",
        key: "4",
    },
    {
        name: "Май",
        monthNumber: 5,
        season: "spring",
        seasonEmoji: "🌷",
        key: "5",
    },
    {
        name: "Июнь",
        monthNumber: 6,
        season: "summer",
        seasonEmoji: "☀️",
        key: "6",
    },
    {
        name: "Июль",
        monthNumber: 7,
        season: "summer",
        seasonEmoji: "☀️",
        key: "7",
    },
    {
        name: "Август",
        monthNumber: 8,
        season: "summer",
        seasonEmoji: "☀️",
        key: "8",
    },
    {
        name: "Сентябрь",
        monthNumber: 9,
        season: "autumn",
        seasonEmoji: "🍂",
        key: "9",
    },
    {
        name: "Октябрь",
        monthNumber: 10,
        season: "autumn",
        seasonEmoji: "🍂",
        key: "10",
    },
    {
        name: "Ноябрь",
        monthNumber: 11,
        season: "autumn",
        seasonEmoji: "🍂",
        key: "11",
    },
    {
        name: "Декабрь",
        monthNumber: 12,
        season: "winter",
        seasonEmoji: "❄️",
        key: "12",
    },
];

export const initialGroupMood: IGroupMood = {
    veryBad: [],
    bad: [],
    normal: [],
    good: [],
    veryGood: [],
};