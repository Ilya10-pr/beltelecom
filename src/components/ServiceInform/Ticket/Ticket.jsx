import React from 'react';
import style from "./Ticket.module.css";
import { useSelector } from 'react-redux';

const Ticket = ({ ticket, allTickets, isButton = false, deleteBooked }) => {
  const records = ticket ? [ticket] : allTickets?.record || [];

  if (!records.length) {
    return <div>Талон не найден</div>;
  }

  return (
    <>
      {records.map((record) => (
        <div key={record.id} className={style.innerTicket}>
          <div className={style.title}>Талон №{record.ticket || 1}</div>
          <div className={style.item}>
            <span>Выбранная услуга</span>
            <span className={style.text}>{record.service}</span>
          </div>
          <div className={style.item}>
            <span>Время приема</span>
            <span className={style.text}>
              {record.date?.slice(0, 10)} {record.time?.slice(0, 5)}
            </span>
          </div>
          <div className={style.item}>
            <span>Тип операции</span>
            <span className={style.text}>{record.action}</span>
          </div>
          <div>
            {record.infoUser ? (
              <span>{`${record.infoUser.surname} ${record.infoUser.name} ${record.infoUser.patronymic}`}</span>
            ) : (
              <span>{`${allTickets?.surname} ${allTickets?.name} ${allTickets?.patronymic}`}</span>
            )}
          </div>
          {isButton && (
            <button onClick={() => deleteBooked(record.id)}>Снять с очереди</button>
          )}
        </div>
      ))}
    </>
  );
};

export default Ticket;
