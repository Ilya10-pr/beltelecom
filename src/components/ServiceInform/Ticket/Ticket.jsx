import React from 'react';
import style from "./Ticket.module.css";
import { useSelector } from 'react-redux';


const Ticket = ({data, allTickets, isButton = false, deleteBooked}) => {

  const records = !data ? allTickets.record : [data.record[data.record?.length - 1]]
  return (
    records.map((record) => (
                <div className={style.innerTicket}>
            <div className={style.title}>Талон №{record.ticket}</div>
              <div className={style.item}>
                <span>Выбранная услуга</span>
                <span className={style.text}>{record.service}</span>
              </div>
              <div className={style.item}>
                <span>Время приема</span>
                <span className={style.text}>{record.date.slice(0, 10)} {record.time.slice(0,5)}</span>
              </div>
              <div className={style.item}>
                <span>Тип операции</span>
                <span className={style.text}>{record.action}</span>
              </div>
              <div>
                {!data ? <span>{`${allTickets.surname} ${allTickets.name} ${allTickets.patronymic}`}</span> : 
                <span>{`${data.surname} ${data.name} ${data.patronymic}`}</span>}
              </div>
              {isButton && <button onClick={() => deleteBooked(data.id)}>Снять с очереди</button>}
          </div>
    ))

        
  )
};

export default Ticket
