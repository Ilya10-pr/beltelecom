import React from 'react'
import { useForm } from 'react-hook-form';
import style from "./Record.module.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  resetTicket } from '../../../store/service/service';
import { createClient } from '../../../api/api';
import toast from 'react-hot-toast';
const Record = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset
  } = useForm();
  const dataClient = useSelector((state) => state.ticket);
  
  const sendData = async (infoUser) => {
    try {
      const newData = {...dataClient, infoUser}
      reset();
      const response = await createClient(newData)
      if(!response){
        toast.error("Ошибка бронирования, попробуйте позже...")
        return
      } 
      toast.success("Забронированно!")
      navigate(`/service/ticket/${response.id}`)
      dispatch(resetTicket())
    } catch (error) {
      console.log(error)
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
      </div>
      <button type="submit" className={style.btn} >
        Продолжить
      </button>
    </form>
    </div>
  )
};

export default Record
