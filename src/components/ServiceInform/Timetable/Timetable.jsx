import React, {useState} from 'react'
import { DayPicker } from "react-day-picker";
import style from "./Timetabe.module.css"
import 'react-day-picker/dist/style.css';
import { addDays, addMonths, isSameDay, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CgEnter } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { setDate } from '../../../store/service/service';
import { useNavigate } from 'react-router-dom';

const bookedSlots = [
  { date: '2025-04-15', times: ['10:00', '14:00', '16:30'] },
  { date: '2025-04-16', times: ['09:00', '11:00', '15:00'] },
  { date: '2025-04-20', times: ['09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'] } // Полностью забронированный день
];

const allTimeSlots = [
  '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const Timetable = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dataClient = useSelector((state) => state.ticket);
  const twoMonthsFromNow = addMonths(new Date(), 2);
  const isDateFullyBooked = (date) => {
    const bookedDate = bookedSlots.find(booked => 
      isSameDay(parseISO(booked.date), date)
    );
    return bookedDate && bookedDate.times.length === allTimeSlots.length;
  };

  const getAvailableTimes = () => {
    if (!selectedDate) return [];
    
    const bookedDate = bookedSlots.find(booked => 
      isSameDay(parseISO(booked.date), selectedDate)
    );
    
    return bookedDate 
      ? allTimeSlots.filter(time => !bookedDate.times.includes(time))
      : allTimeSlots;
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;
    const formattedDate = selectedDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    console.log(formattedDate, selectedTime);
    dispatch(setDate(formattedDate + " " + selectedTime))
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
      <h2>Выберите дату и время</h2>
      <div className={style.service}>Выбранная услуга: {dataClient.service}</div>
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
