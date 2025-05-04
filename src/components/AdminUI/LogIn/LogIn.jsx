import React from 'react'
import { useForm } from 'react-hook-form';
import style from "./LogIn.module.css"
import { loginUser } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const LogIn = () => {
  const navigate = useNavigate()

  const {register, handleSubmit, formState: {errors}} = useForm()

  const logIn = async (data) => {
    try {
      const admin = await loginUser(data);
      
      toast.success("Успешно");
      window.localStorage.setItem("token", admin.token);
      navigate("/admin/add");
      
    } catch (error) {
      console.error("Ошибка при входе:", error);
      if (error.response?.status === 401) {
        toast.error("Неверный логин или пароль");
        return
      }
      toast.error("Произошла ошибка при входе");
    }
  }

  return (
    <div className={style.form}>
        <div className={style.title}>Введите данные для входа</div>
        <form action={handleSubmit(logIn)}>
          <div className={style.item}>
            <label htmlFor="nameId">Имя</label>
            <input className={errors.name?.message ? style.error : ''} id='nameId' type="text" {...register("name", {
              required: 'Это поле обязательно',
              minLength: {
                value: 2,
                message: 'Минимум 2 символа'
              }
            })} />
          </div>
          <div className={style.item}>
            <label htmlFor='surnameId'>Фамилия</label>
            <input className={errors.surname?.message ? style.error : ''} id='surnameId' type='text' {...register("surname", {
              required: 'Это поле обязательно',
              minLength: {
                value: 2,
                message: "Минимум 2 символа"
              }
            })}/>
          </div>
          <div className={style.item}>
            <label htmlFor='patronymicId'>Отчество</label>
            <input className={errors.patronymic?.message ? style.error : ''} id='patronymicId' type='text' {...register("patronymic", {
              required: 'Это поле обязательно',
              minLength: {
                value: 2,
                message: "Минимум 2 символа"
              }
            })}/>
          </div>
          <div className={style.item}>
            <label htmlFor='passwordId'>Пароль</label>
            <input id='passwordId' type='password' {...register("password", {
              required: 'Это поле обязательно',
              minLength: {
                value: 4,
                message: "Минимум 2 символа"
              }
            })}/>
          </div>
          <button type="submit" className={style.btn} >
            Продолжить
          </button>
        </form>
      </div>
  )
};

export default LogIn
