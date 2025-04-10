import React from 'react'
import { useForm } from 'react-hook-form';
import style from "./Record.module.css"
const Record = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const sendData = (data) => {
    console.log('Отправленные данные:', data);
    reset(); 
  };
  return (
    <div className={style.form}>
      <form onSubmit={handleSubmit(sendData)}>
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
        <label htmlFor="lastname">Фамилия</label>
        <input
          id="lastname"
          type="text"
          {...register('lastname', { 
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
        <label htmlFor="number">Номер телефона</label>
        <input
          id="number"
          type="text"
          {...register('number', { 
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
