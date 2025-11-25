import {useEffect, useState} from "react";
import type {MoodData} from "../../utils/interface.tsx";
import style from './tracker.module.css'

function Tracker() {
    const [emotion, setEmotion] = useState("")
    const [text, setText] = useState("")
    const [time, setTime] = useState("")
    const [data, setData] = useState<MoodData[]>([])

    useEffect(() => {
        const parsedData: MoodData[] = JSON.parse(`${localStorage.getItem('moodData')}`);
        if (parsedData) {
            setData(parsedData)
            const mood = parsedData.filter(i => i.timeValue === `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`)
            if (mood.length) {
                setEmotion(mood[0]?.emotionValue)
                setText(mood[0]?.textMessage)
                setTime(mood[0]?.timeValue)
            }
        }
    }, [time]);

    const handleChange = () => {
        if (!emotion.trim() || !text) {
            alert("Пожалуйста, выберите эмоцию и сделайте запись");
            return;
        }

        const currentDate = time || `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;

        const newEntry = {
            emotionValue: emotion,
            textMessage: text,
            timeValue: currentDate,
        };

        let newData: MoodData[];

        const existingEntryIndex = data.findIndex(item => item.timeValue === currentDate);

        if (existingEntryIndex !== -1) {
            newData = [...data];
            newData[existingEntryIndex] = newEntry;
        } else {
            newData = [...data, newEntry];
        }

        setData(newData);
        localStorage.setItem('moodData', JSON.stringify(newData));

        // Оповещение об успехе
        alert("Настроение сохранено! 💫");
    }

    return (
        <div className={style.tracker}>
            <div className={style.tracker__card}>
                <p className={style.tracker__date}>{time || `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`}</p>

                <p className={`${style.tracker__emotion} ${
                    emotion.trim() === "" ? style.tracker__emotionHide : style.tracker__emotionShow
                }`}>
                    Выбранная эмоция: {emotion}
                </p>

                <div className={style.tracker__emotions}>
                    <div
                        onClick={() => setEmotion("Очень плохо")}
                        className={`${style.tracker__emotionCard} ${
                            emotion === "Очень плохо" ? style.tracker__emotionCardChose : ""
                        }`}
                        data-emotion="Очень плохо"
                    >
                        <span className={style.tracker__emoji}>😢</span>
                        <p className={style.tracker__emotionText}>Очень плохо</p>
                    </div>

                    <div
                        onClick={() => setEmotion("Плохо")}
                        className={`${style.tracker__emotionCard} ${
                            emotion === "Плохо" ? style.tracker__emotionCardChose : ""
                        }`}
                        data-emotion="Плохо"
                    >
                        <span className={style.tracker__emoji}>😞</span>
                        <p className={style.tracker__emotionText}>Плохо</p>
                    </div>

                    <div
                        onClick={() => setEmotion("Нормально")}
                        className={`${style.tracker__emotionCard} ${
                            emotion === "Нормально" ? style.tracker__emotionCardChose : ""
                        }`}
                        data-emotion="Нормально"
                    >
                        <span className={style.tracker__emoji}>😐</span>
                        <p className={style.tracker__emotionText}>Нормально</p>
                    </div>

                    <div
                        onClick={() => setEmotion("Хорошо")}
                        className={`${style.tracker__emotionCard} ${
                            emotion === "Хорошо" ? style.tracker__emotionCardChose : ""
                        }`}
                        data-emotion="Хорошо"
                    >
                        <span className={style.tracker__emoji}>😊</span>
                        <p className={style.tracker__emotionText}>Хорошо</p>
                    </div>

                    <div
                        onClick={() => setEmotion("Отлично")}
                        className={`${style.tracker__emotionCard} ${
                            emotion === "Отлично" ? style.tracker__emotionCardChose : ""
                        }`}
                        data-emotion="Отлично"
                    >
                        <span className={style.tracker__emoji}>🤩</span>
                        <p className={style.tracker__emotionText}>Отлично</p>
                    </div>
                </div>

                <div className={style.tracker__inputGroup}>
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        type="text"
                        placeholder="Что повлияло на ваше настроение?"
                        className={style.tracker__input}
                    />
                    <button
                        onClick={handleChange}
                        className={style.tracker__button}
                        disabled={!emotion.trim() || !text}>
                        {!emotion.trim() || !text ? 'Запомнить настроение' : 'Редактировать настроение'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Tracker