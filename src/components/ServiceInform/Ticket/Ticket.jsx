import React from 'react';
import style from "./Ticket.module.css";
import { deleteBookedFromList } from '../../../api/api';


const Ticket = ({data, isButton = false, deleteBooked}) => {


  
  return (
          <div className={style.innerTicket}>
            <div className={style.title}>Талон №{data.numberTicket}</div>
              <div className={style.item}>
                <span>Выбранная услуга</span>
                <span>{data.service}</span>
              </div>
              <div className={style.item}>
                <span>Время приема</span>
                <span>{data.date}</span>
              </div>
              <div className={style.item}>
                <span>Тип операции</span>
                <span>{data.action}</span>
              </div>
              <div>
                <span>{`${data.surname} ${data.name} ${data.patronymic}`}</span>
              </div>
              {isButton && <button onClick={() => deleteBooked(data.id)}>Снять с очереди</button>}
          </div>
        
  )
};

export default Ticket
