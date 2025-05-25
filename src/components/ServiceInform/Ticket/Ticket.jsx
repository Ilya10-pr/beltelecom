import React from 'react';
import style from "./Ticket.module.css";
import { useSelector } from 'react-redux';


const Ticket = ({data, isButton = false, deleteBooked}) => {

  const record = data.record[0]
  const dataClient = useSelector((state) => state.ticket);
  return (
          <div className={style.innerTicket}>
            <div className={style.title}>Талон №{record.ticket}</div>
              <div className={style.item}>
                <span>Выбранная услуга</span>
                <span className={style.text}>{dataClient.service}</span>
              </div>
              <div className={style.item}>
                <span>Время приема</span>
                <span className={style.text}>{record.date.slice(0, 10)} {dataClient.time}</span>
              </div>
              <div className={style.item}>
                <span>Тип операции</span>
                <span className={style.text}>{record.action}</span>
              </div>
              <div>
                <span>{`${data.surname} ${data.name} ${data.patronymic}`}</span>
              </div>
              {isButton && <button onClick={() => deleteBooked(data.id)}>Снять с очереди</button>}
          </div>
        
  )
};

export default Ticket
