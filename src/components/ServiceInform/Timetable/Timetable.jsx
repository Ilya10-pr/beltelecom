import React, {useEffect, useState} from 'react'
import { DayPicker } from "react-day-picker";
import style from "./Timetabe.module.css"
import 'react-day-picker/dist/style.css';
import { addDays, addMonths, isSameDay, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CgEnter } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../../store/service/service';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllRecord, getAllRecords } from '../../../api/api';
import { allTimeSlots } from '../../../helpers/itemLink';

// const data = [
//   {date: '2025-05-05', time: '09:00'},
//   {date: '2025-05-05', time: '10:00'},
//   {date: '2025-05-06', time: '09:00'},
//   {date: '2025-05-06', time: '10:00'},
// ]

const Timetable = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [blockedData, setBlockedData] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dataClient = useSelector((state) => state.ticket);
  const {data } = useQuery({queryKey: ["record"], queryFn:() => getAllRecords() })

  useEffect(() => {
    if(data){
      const result = data.reduce((acc, current) => {
        // Ищем есть ли уже запись с такой датой
        const existingDate = acc.find(item => item.date === current.date);
        
        if (existingDate) {
          // Если дата уже есть - добавляем время в массив
          existingDate.time.push(current.time);
        } else {
          // Если даты нет - создаем новую запись
          acc.push({
            date: current.date,
            time: [current.time]
          });
        }
        
        return acc;
      }, []);
      setBlockedData(result)
    } else {
      setBlockedData([])
    }
  }, [data])
  const twoMonthsFromNow = addMonths(new Date(), 2);
  
  const isDateFullyBooked = (date) => {
    const bookedDate = blockedData?.find(booked => 
      isSameDay(parseISO(booked.date), date)
    );
    return bookedDate && bookedDate.time.length === allTimeSlots.length;
  };

  const getAvailableTimes = () => {
    if (!selectedDate) return [];
    
    const bookedDate = blockedData?.find(booked => 
      isSameDay(parseISO(booked.date), selectedDate)
    );
    
    return bookedDate 
      ? allTimeSlots.filter(time => !bookedDate.time.includes(time))
      : allTimeSlots;
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;
    const formattedDate = selectedDate.toLocaleDateString('en-CA');
    const newDate = isSameDay(parseISO("2025-05-09"), selectedDate.toLocaleDateString())
    console.log(newDate)
    console.log(formattedDate);
    dispatch(setDate({date: formattedDate, time: selectedTime}))
    navigate("/service/info")
    setIsBooked(true);
  };

  const modifiers = {
    fullyBooked: (date) => isDateFullyBooked(date),
    past: (date) => date < new Date().setHours(0, 0, 0, 0)
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
      <div className={style.service}>
        <div>Услуга: {dataClient.service}</div>
        <div>Операция: {dataClient.action}</div>
      </div>
      <h2>Выберите дату и время</h2>
      <DayPicker
        locale={ru}
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        disabled={[
          { before: new Date() },// Блокируем прошедшие даты
          {after: twoMonthsFromNow}, //Показываем только 2 месяца
          (date) => isDateFullyBooked(date) // Блокируем полностью занятые даты
        ]}
        styles={{root: {
          display: "flex",
          justifyContent: "center"
        }}}
      />

      {selectedDate && (
        <div className={style.timeSlots}>
          <h3>Доступное время на {selectedDate.toLocaleDateString()}</h3>
          <div className={style.timeButtons}>
            {getAvailableTimes().map(time => (
              <button
                key={time}
                className={`${style.timeBtn} ${selectedTime === time ? 'active' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedTime && !isBooked && (
        <button className={style.bookBtn} onClick={handleBooking}>
          Забронировать {selectedTime}
        </button>
      )}

      {isBooked && (
        <div className={style.confirmation}>
          <p>✅ Вы успешно забронировали на {selectedDate.toLocaleDateString()} в {selectedTime}</p>
          <button onClick={() => {
            setSelectedDate(null);
            setSelectedTime(null);
            setIsBooked(false);
          }}>
            Сделать новое бронирование
          </button>
        </div>
      )}
    </div>
  );
};

export default Timetable;
