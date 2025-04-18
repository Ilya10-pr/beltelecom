import React from 'react'
import style from "./SearchClient.module.css"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SearchClient = () => {
    const {register, handleSubmit, reset} = useForm()
    const navigate = useNavigate()

    const searchClient = (data) => {
      console.log(data)
      navigate("/admin/options")
    }
      return (
        <div className={style.form}>
            <div className={style.title}>Найти клиента</div>
            <form action={handleSubmit(searchClient)}>
              <div className={style.innerForm}>
                <div className={style.item}>
                  <label htmlFor="nameId">Имя</label>
                  <input id='nameId' type="text"  {...register("name")}/>
                </div>
                <div className={style.item}>
                  <label htmlFor='surnameId'>Фамилия</label>
                  <input id='surnameId' type='text' {...register("surname")}/>
                </div>
                <div className={style.item}>
                  <label htmlFor='patronymicId'>Отчество</label>
                  <input id='patronymicId' type='text'  {...register("patronymic")}/>
                </div>
                <div className={style.item}>
                  <label htmlFor='contractId'>Номер договора</label>
                  <input id='contractId' type='password'  {...register("numContract")}/>
                </div>
                <div className={style.item}>
                  <label htmlFor='appId'>Номер приложения</label>
                  <input id='appId' type='password'  {...register("numApp")}/>
                </div>
                <button type="submit" className={style.btn} >
                  Поиск
                </button>
              </div>
            </form>
          </div>
      )
};

export default SearchClient
