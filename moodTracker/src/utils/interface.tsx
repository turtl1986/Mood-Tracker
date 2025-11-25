export type Season = "winter" | "spring" | "summer" | "autumn";

export interface MonthSeasonInfo {
    name: string;
    monthNumber: number;
    season: Season;
    seasonEmoji: string;
    key: string;
}

export interface IGroupMood {
    veryBad: MoodData[];
    bad: MoodData[];
    normal: MoodData[];
    good: MoodData[];
    veryGood: MoodData[];
}

export interface ArrayMood {
    name: string;
    emoji: string;
    color: string;
}

export interface MoodData {
    emotionValue: string;
    textMessage: string;
    timeValue: string;
}