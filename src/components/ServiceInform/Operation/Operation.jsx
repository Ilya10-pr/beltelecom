import React from 'react';
import style from "./Operation.module.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setService } from '../../../store/service/service';

const Operation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataClient = useSelector((state) => state.ticket);


  const handleService = (e) => {
    console.log(e.currentTarget.innerText)
    dispatch(setService(e.currentTarget.innerText))
    navigate("/service/date")
  }
  return (
    <div className={style.operation}>
      <div>Выберите операцию</div>
      <div className={style.service}>Выбранная услуга: {dataClient.service}</div>
      <button onClick={(e) => handleService(e)}>
        Оформление услуги
      </button>
      <button onClick={(e) => handleService(e)}>
        Расторжение услуги
      </button>
      <button onClick={(e) => handleService(e)}>
        Переоформление услуги на другого человека 
      </button>
      <button onClick={(e) => handleService(e)}>
        Приостоновление работы услуги
      </button>
    </div>
  )
};

export default Operation
