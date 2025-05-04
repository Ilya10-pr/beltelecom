import React from 'react'
import { useForm } from 'react-hook-form';
import style from "./Record.module.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetInfo, resetTicket, setInfoUser } from '../../../store/service/service';
import { createClient } from '../../../api/api';
const Record = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const dataClient = useSelector((state) => state.ticket);
  
  const sendData = async (infoUser) => {
    console.log('Отправленные данные:', infoUser);
    const newData = {...dataClient, infoUser}
    console.log(newData)
    reset();
    const response = await createClient(newData)
    if(response){
      navigate(`/service/ticket/${response.id}`)
      dispatch(resetTicket())
    } else {
      console.log("Не удалось забронировать.")
    }
  }
  return (
    <div className={style.form}>
      <div className={style.service}>
        <div>Услуга: {dataClient.service}</div>
        <div>Операция: {dataClient.action}</div>
        <div>Дата и время: {dataClient.date} {dataClient.time}</div>
      </div>
      <form onSubmit={handleSubmit(sendData)}>
      <div className={style.title}>Заполните личные данные</div>
      <div className={style.item}>
        <label htmlFor="name">Имя</label>
        <input
          id="name"
          type="text"
          {...register('name', { 
            required: 'Это поле обязательно',
            minLength: {
              value: 2,
              message: 'Минимум 2 символа'
            }
          })}
        />
        {/* {errors.name && <span >{errors.name.message}</span>} */}
      </div>
      <div className={style.item}>
        <label htmlFor="surname">Фамилия</label>
        <input
          id="surname"
          type="text"
          {...register('surname', { 
            required: 'Это поле обязательно',
            minLength: {
              value: 2,
              message: 'Минимум 2 символа'
            }
          })}
        />
        {/* {errors.lastname && <span >{errors.lastname.message}</span>} */}
      </div>
      <div className={style.item}>
        <label htmlFor="patronymic">Отчетсво</label>
        <input
          id="patronymic"
          type="text"
          {...register('patronymic', { 
            required: 'Это поле обязательно',
            minLength: {
              value: 2,
              message: 'Минимум 2 символа'
            }
          })}
        />
        {/* {errors.patronymic && <span >{errors.patronymic.message}</span>} */}
      </div>
      <div className={style.item}>
        <label htmlFor="phone">Номер телефона</label>
        <input
          id="phone"
          type="text"
          {...register('phone', { 
            required: 'Это поле обязательно',
            minLength: {
              value: 2,
              message: 'Минимум 2 символа'
            }
          })}
        />
        {/* {errors.number && <span >{errors.number.message}</span>} */}
      </div>
      <button type="submit" className={style.btn} >
        Продолжить
      </button>
    </form>
    </div>
  )
};

export default Record
