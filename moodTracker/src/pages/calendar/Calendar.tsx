import {useEffect, useState} from "react";
import type {ArrayMood, IGroupMood, MonthSeasonInfo, MoodData} from "../../utils/interface.tsx";
import {arrayMood, initialGroupMood, monthsWithSeason} from "../../dataMood.tsx";
import styles from './calendar.module.css';

function Calendar() {
    const [data, setData] = useState<MoodData[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [groupMood, setGroupMood] = useState<IGroupMood>(initialGroupMood);

    useEffect(() => {
        const raw = localStorage.getItem("moodData");
        const parsedData: MoodData[] = raw ? JSON.parse(raw) : [];
        setData(parsedData);

        const now = new Date();
        const currentMonthYear = `${now.getMonth() + 1}.${now.getFullYear()}`;
        setSelectedMonth(currentMonthYear);
        updateMoodByMonth(currentMonthYear, parsedData);
    }, []);

    const updateMoodByMonth = (monthYear: string, sourceData: MoodData[]) => {
        const mood = sourceData.filter(i => {
            const monthYearFromItem = i.timeValue.split('.').slice(1).join('.');
            return monthYearFromItem === monthYear;
        });

        const grouped: IGroupMood = {
            veryBad: [],
            bad: [],
            normal: [],
            good: [],
            veryGood: [],
        };

        mood.forEach(item => {
            const emotion = item.emotionValue.trim();
            if (emotion === "Очень плохо") grouped.veryBad.push(item);
            else if (emotion === "Плохо") grouped.bad.push(item);
            else if (emotion === "Нормально") grouped.normal.push(item);
            else if (emotion === "Хорошо") grouped.good.push(item);
            else grouped.veryGood.push(item);
        });

        setGroupMood(grouped);
    };

    const createBlock = (array: MoodData[]) => {
        return (
            <div>
                {array.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <p className={styles.card__time}>{item.timeValue}</p>
                        <p className={styles.card__text}>{item.textMessage}</p>
                    </div>
                ))}
            </div>
        );
    }

    const createCardsBlock = () => {
        const total = getTotalCount();
        if (!total) return <div className={styles.emptyNotes}>У вас нет записей</div>

        return (
            <>
                <div className={styles.cards}>
                    {arrayMood.map((item, index) => {
                        const moodState = getMoodState(item);
                        const day = moodState.length;
                        if (!day) return null;

                        return (
                            <div key={index} className={styles.cards__item}>
                                <div className={styles.cards__header}>
                                    <p className={styles.cards__title}>{item.name} {item.emoji}</p>
                                    <p className={styles.cards__count}>{day}</p>
                                </div>
                                {createBlock(moodState)}
                            </div>
                        );
                    })}
                </div>
                <p className={styles.statistick__subtitle}>Этот момент — только для тебя! 😊</p>
            </>
        );
    };

    const getTotalCount = () => {
        return groupMood.veryBad.length + groupMood.bad.length +
            groupMood.normal.length + groupMood.good.length +
            groupMood.veryGood.length;
    }

    const getMoodState = (item: ArrayMood) => {
        switch (item.name) {
            case "Очень плохо": return groupMood.veryBad;
            case "Плохо": return groupMood.bad;
            case "Нормально": return groupMood.normal;
            case "Хорошо": return groupMood.good;
            default: return groupMood.veryGood;
        }
    }

    const createCardsMonth = () => {
        return (
            <div className={styles.calendarMonth}>
                <div className={styles.calendarMonth__buttons}>
                    {monthsWithSeason.map(item =>
                        <button
                            className={`${styles.calendarMonth__button} ${
                                selectedMonth.startsWith(`${item.monthNumber}.`) ?
                                    styles.calendarMonth__buttonActive : '' }`}
                            key={item.key}
                            onClick={() => handleMonth(item)}>
                            {item.name} {item.seasonEmoji}
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const handleMonth = (item: MonthSeasonInfo) => {
        const monthYear = `${item.monthNumber}.${new Date().getFullYear()}`;
        setSelectedMonth(monthYear);
        updateMoodByMonth(monthYear, data);
    };

    return (
        <div className={styles.calendar}>
            {createCardsMonth()}
            <div className={styles.statistick}>
                <p className={styles.statistick__title}>За {selectedMonth}:</p>
                {createCardsBlock()}
            </div>
        </div>
    )
}

export default Calendar;