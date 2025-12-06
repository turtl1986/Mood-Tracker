export type Season = "winter" | "spring" | "summer" | "autumn";

export interface MonthSeasonInfo {
    name: string;
    monthNumber: number;
    season: Season;
    seasonEmoji: string;
    key: string;
}

export interface IGroupMood {
    veryBad: IMoodData[];
    bad: IMoodData[];
    normal: IMoodData[];
    good: IMoodData[];
    veryGood: IMoodData[];
}

export interface ArrayMood {
    name: string;
    emoji: string;
    color: string;
}

export interface IMoodData {
    emotionValue: string;
    timeValue: string;
    reasonMessage: string;
    energyValue: number;
    activityMessage: string;
    noteMessage: string;
}

export interface IFormState {
    emotion: string;
    reason: string;
    note: string;
    activity: string;
    energy: number;
}