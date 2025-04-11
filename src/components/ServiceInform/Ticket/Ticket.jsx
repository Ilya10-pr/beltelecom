import React from 'react';
import style from "./Ticket.module.css";

const Ticket = () => {
  return (
    <div className={style.wrapperTicket}>
      <div className={style.innerTicket}>
        <div className={style.title}>Талон №1</div>
        <div className={style.item}>
          <span>Выбранная услуга</span>
          <span>ЯСНО 500</span>
        </div>
        <div className={style.item}>
          <span>Время приема</span>
          <span>15-04-2025 09:00</span>
        </div>
        <div className={style.item}>
          <span>Тип операции</span>
          <span>Оформление</span>
        </div>
        <div>
          <span>Прибыльский Илья Витальевич</span>
        </div>
      </div>
    </div>
  )
};

export default Ticket
