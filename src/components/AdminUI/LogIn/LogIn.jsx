import React from 'react'
import { useForm } from 'react-hook-form';
import style from "./LogIn.module.css"

const LogIn = () => {

  const {register, handleSubmit, formState: {errors}, reset} = useForm()
  return (
    <div className={style.form}>
        <div className={style.title}>Введите данные для входа</div>
        <form action="">
          <div className={style.item}>
            <label htmlFor="nameId">Имя</label>
            <input id='nameId' type="text" {...register("name", {
              required: 'Это поле обязательно',
              minLength: {
                value: 2,
                message: 'Минимум 2 символа'
              }
            })} />
            {/* {errors.name && <span >{errors.name.message}</span>} */}
          </div>
          <div className={style.item}>
            <label htmlFor='surnameId'>Фамилия</label>
            <input id='surnameId' type='text' {...register("surname", {
              required: 'Это поле обязательно',
              minLength: {
                value: 2,
                message: "Минимум 2 символа"
              }
            })}/>
            {/* errors.surname && <span>{errors.surname.message}</span> */}
          </div>
          <div className={style.item}>
            <label htmlFor='patronymicId'>Отчество</label>
            <input id='patronymicId' type='text' {...register("patronymic", {
              required: 'Это поле обязательно',
              minLength: {
                value: 2,
                message: "Минимум 2 символа"
              }
            })}/>
            {/* errors.patronymic && <span>{errors.patronymic.message}</span> */}
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
            {/* errors.password && <span>{errors.password.message}</span> */}
          </div>
          <button type="submit" className={style.btn} >
            Продолжить
          </button>
        </form>
      </div>
  )
};

export default LogIn
