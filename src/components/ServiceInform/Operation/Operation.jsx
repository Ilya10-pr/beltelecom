import React from 'react';
import style from "./Operation.module.css"
import { useNavigate } from 'react-router-dom';

const Operation = () => {
  const navigate = useNavigate();

  const selectOperation = () => {
    navigate("/service/date")
  }
  return (
    <div className={style.operation}>
      <button onClick={() => selectOperation()}>
        Оформление услуги
      </button>
      <button onClick={() => selectOperation()}>
        Расторжение услуги
      </button>
      <button onClick={() => selectOperation()}>
        Переоформление услуги на другого человека 
      </button>
      <button onClick={() => selectOperation()}>
        Приостоновление работы услуги
      </button>
    </div>
  )
};

export default Operation
