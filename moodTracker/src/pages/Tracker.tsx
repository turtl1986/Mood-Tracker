import {useEffect, useState} from "react";

export interface MoodData {
    emotionValue: string;
    textMessage: string;
    timeValue: string;
}

function Tracker() {

    const [emotion, setEmotion] = useState("")
    const [text, setText] = useState("")
    const [time, setTime] = useState("")
    const [data, setData] = useState<MoodData[]>([])


    useEffect(() => {
        const parsedData: MoodData[] = JSON.parse(`${localStorage.getItem('moodData')}`);
        setData(parsedData)
        const mood = parsedData.filter(i => i.timeValue === `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`)
        if (mood.length) {
            setEmotion(mood[0]?.emotionValue)
            setText(mood[0]?.textMessage)
            setTime(mood[0]?.timeValue)
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
    }

    return (
        <>
            <div className="card">
                <p>{time}</p>
                <p className={`${emotion.trim() === "" ? "hide" : "show"}`}>Выбранная эмоция: {emotion}</p>
                <div className="emotion-cards">
                    <div onClick={() => setEmotion("Очень плохо")}
                         className={`emotion-card ${emotion === "Очень плохо" ? "chose" : ""}`}>
                        <p>😢 </p>
                        <p>Очень плохо</p>
                    </div>

                    <div onClick={() => setEmotion("Плохо")}
                         className={`emotion-card ${emotion === "Плохо" ? "chose" : ""}`}>
                        <p>😞 </p>
                        <p>Плохо</p>
                    </div>

                    <div onClick={() => setEmotion("Нормально")}
                         className={`emotion-card ${emotion === "Нормально" ? "chose" : ""}`}>
                        <p>😐 </p>
                        <p>Нормально</p>
                    </div>

                    <div onClick={() => setEmotion("Хорошо")}
                         className={`emotion-card ${emotion === "Хорошо" ? "chose" : ""}`}>
                        <p>😊 </p>
                        <p>Хорошо </p>
                    </div>

                    <div onClick={() => setEmotion("Отлично")}
                         className={`emotion-card ${emotion === "Отлично" ? "chose" : ""}`}>
                        <p>🤩 </p>
                        <p>Отлично</p>
                    </div>
                </div>
                <div>
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        type="text"
                        placeholder={`Что повлияло на ваше настроение?`}
                        className="input-field"
                    />
                    <button onClick={handleChange}>Запомнить</button>
                </div>
            </div>
        </>
    )
}

export default Tracker