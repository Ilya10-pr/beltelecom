import React from 'react';
import style from "./Ticket.module.css";
import { deleteBookedFromList } from '../../../api/api';


const Ticket = ({data, isButton = false, deleteBooked}) => {

  const record = data.record[0]
  
  return (
          <div className={style.innerTicket}>
            <div className={style.title}>Талон №{record.ticket}</div>
              <div className={style.item}>
                <span>Выбранная услуга</span>
                <span>{record.service}</span>
              </div>
              <div className={style.item}>
                <span>Время приема</span>
                <span>{record.date}</span>
              </div>
              <div className={style.item}>
                <span>Тип операции</span>
                <span>{record.action}</span>
              </div>
              <div>
                <span>{`${data.surname} ${data.name} ${data.patronymic}`}</span>
              </div>
              {isButton && <button onClick={() => deleteBooked(data.id)}>Снять с очереди</button>}
          </div>
        
  )
};

export default Ticket
