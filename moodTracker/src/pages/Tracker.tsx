import {useEffect, useState} from "react";

function Tracker() {

    const [emotion, setEmotion] = useState("")
    const [text, setText] = useState("")
    const time = `${new Date().getDate()}.${new Date().getMonth() + 1}`

    useEffect(() => {
        const objectEmotion = JSON.parse(`${localStorage.getItem(time + `.${new Date().getFullYear()}`)}`)
        setEmotion(objectEmotion.emotionValue)
        setText(objectEmotion.textMessage)
    }, [time]);

    const handleChange = () => {

        const moodData = {
            emotionValue: emotion,
            textMessage: text,
        };
        localStorage.setItem(time + `.${new Date().getFullYear()}`, JSON.stringify(moodData));
    }

    return (
        <>
            <h1>Поймай Волну Эмоций</h1>
            <p>Забудь о серых буднях! Наше приложение поможет тебе отслеживать свои чувства и видеть, как меняется твой
                внутренний мир. Это проще, чем утренний кофе!</p>
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