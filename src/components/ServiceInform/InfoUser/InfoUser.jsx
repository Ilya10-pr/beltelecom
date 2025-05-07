import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import style from "./Record.module.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  resetTicket } from '../../../store/service/service';
import { createClient } from '../../../api/api';
import toast from 'react-hot-toast';
const Record = () => {
  const [isChecked, setChecked] = useState()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
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
          onKeyPress={(e) => {
            const isValidChar = /^[a-zA-Zа-яА-ЯёЁ\s]$/.test(e.key);
            if (!isValidChar) {
              e.preventDefault();
            }
          }}
        />
        {errors.name && <p className={style.errors}>{errors.name.message}</p>}
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
          onKeyPress={(e) => {
            const isValidChar = /^[a-zA-Zа-яА-ЯёЁ\s]$/.test(e.key);
            if (!isValidChar) {
              e.preventDefault();
            }
          }}
        />
        {errors.surname && <p className={style.errors}>{errors.surname.message}</p>}
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
          onKeyPress={(e) => {
            const isValidChar = /^[a-zA-Zа-яА-ЯёЁ\s]$/.test(e.key);
            if (!isValidChar) {
              e.preventDefault();
            }
          }}
        />
        {errors.patronymic && <p className={style.errors}>{errors.patronymic.message}</p>}
      </div>
      <div className={style.item}>
        <label htmlFor="phone">Номер телефона</label>
        <input
          id="phone"
          type="tel"
          {...register('phone', { 
            required: 'Это поле обязательно',
            minLength: {
              value: 11,
              message: 'Минимум 11 цифр'
            },
            maxLength: {
              value: 13,
              message: 'Максимум 13 цифр'
            },
          })}
          onKeyPress={(e) => {
            const isValidChar = /^[0-9!@#$%^&*()_+\-=\]{};':"\\|,.<>?]*$/.test(e.key);
            if (!isValidChar) {
              e.preventDefault();
            }
          }}
        />
        {errors.phone && <p className={style.errors}>{errors.phone.message}</p>}
      </div>
      <div className={style.checkbox}>
        <input type="checkbox" id='agreementId' onChange={(e) => {
          setChecked(e.target.checked)
          console.log(errors)
          console.log(isChecked)
        }}/>
        <label htmlFor="agreementId">Я соглашаюсь на обработку своих персональных данных.</label>
      </div>
      <button type="submit" className={Object.keys(errors).length === 0 && isChecked ? style.btn : style.disabled}>
          Продолжить
      </button>
      
       
    </form>
    </div>
  )
};

export default Record
