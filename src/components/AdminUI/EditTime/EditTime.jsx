import React, {useState} from 'react'
import { DayPicker } from "react-day-picker";
import style from "./EditTime.module.css"
import 'react-day-picker/dist/style.css';
import { addMonths} from 'date-fns';
import { ru } from 'date-fns/locale';
import { createRecords } from '../../../api/api';
import { allTimeSlots } from '../../../helpers/itemLink';
import toast from 'react-hot-toast';


const EditTime = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [blockedTime, setBlockedTime] = useState([]);

  const twoMonthsFromNow = addMonths(new Date(), 2);
  
  const editDateAndTime = (time) => {
    setBlockedTime(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time) 
        : [...prev, time] 
    );
  }

  const handleBooking = async () => {
    try {
      const data = blockedTime.map((time) => {
        return {date: selectedDate.toLocaleDateString("en-CA"), time: time}
      });
      const response = await createRecords(data)
      if(!response){
        toast.error("Ошибка, попробуйте позже...")
        return
      }
      toast.success("Успешно!")
      
    } catch (error) {
      console.log(error)
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
        onSelect={setSelectedDate}
        modifiersStyles={modifiersStyles}
        disabled={[
          { before: new Date() },
          {after: twoMonthsFromNow}, 
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

