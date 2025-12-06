import React, {useEffect, useState} from "react";
import type {IFormState, IMoodData} from "../../utils/interface.tsx";
import style from './tracker.module.css'
import {arrayMood} from "../../dataMood.tsx";

function Tracker() {
    const [formState, setFormState] = useState<IFormState>({
        emotion: "",
        reason: "",
        note: "",
        activity: "",
        energy: 0
    });

    const [time, setTime] = useState("");
    const [data, setData] = useState<IMoodData[]>([]);

    const getNowTime = () => {
        const now = new Date();
        return `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
    }

    const updateFormField = (fields: Partial<IFormState>) => {
        setFormState(prev => ({...prev, ...fields}));
    }

    useEffect(() => {
        const savedData = localStorage.getItem('moodData');
        if (!savedData) return;

            const parsedData: IMoodData[] = JSON.parse(savedData);
            const today = getNowTime();
            const todayMood = parsedData.find(item => item.timeValue === today);

            if (todayMood) {
                setData(parsedData);
                setTime(todayMood.timeValue);

                setFormState({
                    emotion: todayMood.emotionValue || "",
                    reason: todayMood.reasonMessage || "",
                    note: todayMood.noteMessage || "",
                    activity: todayMood.activityMessage || "",
                    energy: todayMood.energyValue || 0,
                });
            }

    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formState.emotion.trim() || !formState.reason.trim() || !formState.activity.trim() || !formState.note.trim()) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        const currentDate = time || getNowTime();

        const newEntry: IMoodData = {
            emotionValue: formState.emotion,
            reasonMessage: formState.reason,
            timeValue: currentDate,
            energyValue: formState.energy,
            activityMessage: formState.activity,
            noteMessage: formState.note,
        };

        const existingIndex = data.findIndex(item => item.timeValue === currentDate);
        let newData: IMoodData[];

        if (existingIndex !== -1) {
            newData = [...data];
            newData[existingIndex] = newEntry;
        } else {
            newData = [...data, newEntry];
        }

        setData(newData);
        localStorage.setItem('moodData', JSON.stringify(newData));
        alert("Настроение сохранено! 💫");
    }

    const hasAnyInput = () => {
        return formState.emotion.trim() !== "" || formState.reason.trim() !== "" ||
            formState.activity.trim() !== "" ||
            formState.note.trim() !== "" ||
            formState.energy >= 0;
    }

    const isTodayEntryExists = () => {
        return data.some(item => item.timeValue === (time || getNowTime()));
    }

    const renderEnergyScale = () => (
        <div className={style.tracker__energy_scale}>
            <h3 className={style.tracker__emotions_label}>Уровень энергии</h3>
            <p className={style.tracker__emotions_label}>Оценка своего уровня энергии от 0 до 10</p>
            {Array.from({length: 11}, (_, index) => (
                <div
                    key={index}
                    onClick={() => updateFormField({'energy': formState.energy === index + 1 ? index : index + 1})}
                    className={`${style.energyPoint} ${
                        index < formState.energy ? style.active : ""
                    }`}
                />
            ))}
        </div>
    );

    const renderEmotionCards = () => (
        <div className={style.tracker__emotions}>
            {arrayMood.map((item) => (
                <div key={item.name}
                    onClick={() => updateFormField({'emotion': item.name})}
                    className={`${style.tracker__emotionCard} ${
                        formState.emotion === item.name ? style.tracker__emotionCardChose : ""
                    }`}>
                    <span className={style.tracker__emoji}>{item.emoji}</span>
                    <p className={style.tracker__emotionText}>{item.name}</p>
                </div>
            ))}
        </div>
    )

    return (
        <div className={style.tracker}>
            <p className={style.tracker__date}>{time || getNowTime()}</p>

            <h2 className={`${style.tracker__emotion} ${
                !formState.emotion ? style.tracker__emotionHide : style.tracker__emotionShow
            }`}>
                Выбранная эмоция: {formState.emotion}
            </h2>

            <form className={style.tracker__card} onSubmit={handleSubmit}>
                {renderEmotionCards()}

                <input
                    value={formState.reason}
                    onChange={(e) => updateFormField({'reason': e.target.value})}
                    type="text"
                    placeholder="Что повлияло на ваше настроение?"
                    className={style.tracker__input}
                />

                {renderEnergyScale()}

                <input
                    value={formState.activity}
                    onChange={(e) => updateFormField({'activity': e.target.value})}
                    type="text"
                    placeholder="Чем вы занимались сегодня?"
                    className={style.tracker__input}
                />

                <input
                    value={formState.note}
                    onChange={(e) => updateFormField({'note': e.target.value})}
                    type="text"
                    placeholder="Дополнительные заметки"
                    className={style.tracker__input}
                />

                <button type="submit" className={style.tracker__button} disabled={!hasAnyInput()}>
                    {isTodayEntryExists() ? 'Обновить запись' : 'Сохранить настроение'}
                </button>
            </form>
        </div>
    );
}

export default Tracker;