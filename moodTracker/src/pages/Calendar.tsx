import {useEffect, useState} from "react";
import type {MoodData} from "./Tracker.tsx";

function Calendar() {

    const [time, setTime] = useState("")
    const [veryBad, setVeryBad] = useState<MoodData[]>([])
    const [bad, setBad] = useState<MoodData[]>([])
    const [normal, setNormal] = useState<MoodData[]>([])
    const [good, setGood] = useState<MoodData[]>([])
    const [veryGood, setVeryGood] = useState<MoodData[]>([])

    useEffect(() => {
        const parsedData: MoodData[] = JSON.parse(`${localStorage.getItem('moodData')}`);

        const mood = parsedData.filter(i => {
            const monthYear = i.timeValue.split('.').slice(1).join('.')
            return monthYear === `${new Date().getMonth() + 1}.${new Date().getFullYear()}`
        })

        setTime(`${new Date().getMonth() + 1}.${new Date().getFullYear()}`)

        mood.forEach(item => {
            if (item.emotionValue.trim() === "Очень плохо") {
                setVeryBad([...veryBad, item]);
            } else if (item.emotionValue.trim() === "Плохо") {
                setBad([...bad, item]);
            } else if (item.emotionValue.trim() === "Нормально") {
                setNormal([...normal, item]);
            } else if (item.emotionValue.trim() === "Хорошо") {
                setGood([...good, item]);
            } else {
                setVeryGood([...veryGood, item]);
            }
        })
    }, []);

    const createBlock = (array: MoodData[]) => {
        return (
            <div>
                {array.map((item, index) => (
                    <div key={index} className="card">
                        <p className="time">{item.timeValue}</p>
                        <p className="text">{item.textMessage}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="statistick">
                <p>За {time}:</p>
                <div>
                    <p className={`${veryGood.length === 0 ? "hide" : "show"}`}>{veryGood.length} дней "Отлично" 🤩</p>
                    <button>Открыть</button>
                    {createBlock(veryGood)}
                </div>
                <div>
                    <p className={`${good.length === 0 ? "hide" : "show"}`}>{good.length} дней "Хорошо" 😊</p>
                    <button>Открыть</button>
                    {createBlock(good)}
                </div>
                <div>
                    <p className={`${normal.length === 0 ? "hide" : "show"}`}>{normal.length} дней "Нормально" 😐</p>
                    <button>Открыть</button>
                    {createBlock(normal)}
                </div>
                <div>
                    <p className={`${bad.length === 0 ? "hide" : "show"}`}>{bad.length} дней "Плохо" 😞</p>
                    <button>Открыть</button>
                    { createBlock(bad)}
                </div>
                <div>
                    <p className={`${veryBad.length === 0 ? "hide" : "show"}`}>{veryBad.length} дней "Очень плохо" 😢</p>
                    <button>Открыть</button>
                    {createBlock(veryBad)}
                </div>
                <p>Этот момент — только для тебя! 😊</p>
            </div>
        </>
    )
}

export default Calendar