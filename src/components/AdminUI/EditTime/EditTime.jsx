import React, {useEffect, useState} from 'react'
import { DayPicker } from "react-day-picker";
import style from "./EditTime.module.css"
import 'react-day-picker/dist/style.css';
import { addMonths} from 'date-fns';
import { ru } from 'date-fns/locale';
import toast from 'react-hot-toast';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';


const EditTime = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [blockedTime, setBlockedTime] = useState([]);
  const [customTime, setCustomTime] = useState('12:00'); 

  const twoMonthsFromNow = addMonths(new Date(), 2);



  const setDate = (d) => {
    setSelectedDate(d)
    const data = JSON.parse(window.localStorage.getItem("times"))
    if(!data) {
      return
    }
    const isTimes = data.filter(f => f.date === d.toLocaleDateString('en-CA') ).flatMap(item => item.times)
    setBlockedTime(isTimes)

  }
  const addCustomTime = () => {
    if (customTime && !blockedTime.includes(customTime)) {
      setBlockedTime([...blockedTime, customTime]);
    }
  };

  const delteTime = (time) => {
    setBlockedTime(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleBooking = async () => {
    try {
      if(!window.localStorage.getItem("times")) {
        const data = [{date: selectedDate.toLocaleDateString("en-CA"), times: blockedTime}]
        window.localStorage.setItem("times", JSON.stringify(data))
        toast.success("Успешно")
        return
      }
      const data = JSON.parse(window.localStorage.getItem("times"))
      const newData = [...data, {date: selectedDate.toLocaleDateString("en-CA"), times: blockedTime}]
      window.localStorage.setItem("times", JSON.stringify(newData))
      toast.success("Успешно")
      
    } catch (error) {
      console.log(error)
      toast.error("Ошибка, попробуйте позже...")
    }

  };


  const modifiersStyles = {
    fullyBooked: {
      color: '#ccc',
      textDecoration: 'line-through',
      cursor: 'not-allowed'
    },
    past: {
      color: '#ccc',
      cursor: 'not-allowed'
    }
  };

  return (
    <div className={style.bookingContainer}>
      <h2>Выберите дату и время для редактирования</h2>
      <DayPicker
        locale={ru}
        mode="single"
        selected={selectedDate}
        onSelect={(d) => setDate(d)}
        modifiersStyles={modifiersStyles}
        disabled={[
          { before: new Date() },
          {after: twoMonthsFromNow}, 
        ]}
        className={style.dayPicker}
      />

      {selectedDate && (
        <div className={style.timeSection}>
          <h3>Выбранная дата: {selectedDate.toLocaleDateString()}</h3>
          
          <div className={style.timeInputContainer}>
          <TimePicker
            onChange={setCustomTime}
            value={customTime}
            format="HH:mm" // 24-часовой формат
            clearIcon={null} // Убираем кнопку очистки
            className={style.timeInput}
            disableClock={true}

          />
            {/* <input
              type="time"
              step="3600" // Шаг в 1 час (3600 секунд)
              pattern="[0-9]{2}:[0-9]{2}" // Паттерн для 24-часового формата
              value={customTime}
              onChange={handleTimeChange}
              className={style.timeInput}
            /> */}
            <button 
              onClick={addCustomTime}
              className={style.addButton}
              disabled={!customTime}
            >
              Добавить время
            </button>
          </div>

          <div className={style.timeList}>
            {blockedTime.map((time, index) => (
              <div key={index} className={style.timeItem}>
                <label htmlFor={`time-${index}`} className={style.timeLabel}>
                  {time}
                </label>
                <button 
                  onClick={() => delteTime(time)}
                  className={style.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <button className={style.bookBtn} onClick={() => handleBooking()}>
        Сохранить
      </button>
    
    </div>
  );
};

export default EditTime;

