import React, {useState} from 'react'
import { DayPicker } from "react-day-picker";
import style from "./EditTime.module.css"
import 'react-day-picker/dist/style.css';
import { addDays, addMonths, isSameDay, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CgEnter } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../../store/service/service';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { createRecords, getAllRecord, getAllRecords } from '../../../api/api';
import { allTimeSlots } from '../../../helpers/itemLink';



const EditTime = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [blockedTime, setBlockedTime] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const twoMonthsFromNow = addMonths(new Date(), 2);
  


  const editDateAndTime = (time) => {
    setBlockedTime(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time) 
        : [...prev, time] 
    );
  }

  const handleBooking = async () => {
    const data = blockedTime.map((time) => {
      return {date: selectedDate.toLocaleDateString("en-CA"), time: time}
    });
    const response = await createRecords(data)
    if(!response){
      console.log("Ошибка")
      return
    }
    console.log(response)

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
        onSelect={setSelectedDate}
        modifiersStyles={modifiersStyles}
        disabled={[
          { before: new Date() },// Блокируем прошедшие даты
          {after: twoMonthsFromNow}, //Показываем только 2 месяца
        ]}
        className={style.dayPicker}
      />

      {selectedDate && (
        <div className={style.timeSlots}>
          <h3>Выберите доступное время на {selectedDate.toLocaleDateString()}</h3>
          <div className={style.timeButtons}>
            {allTimeSlots.map(time => (
              <>
                <input
                type="checkbox"
                id={`time-${time}`}
                className={style.checkbox}
                checked={blockedTime.includes(time)}
                onChange={() => editDateAndTime(time)}
              />
              <label htmlFor={`time-${time}`} className={style.timeLabel}>
                {time}
              </label>
              </>
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

