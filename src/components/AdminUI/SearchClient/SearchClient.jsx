import React from 'react'
import style from "./SearchClient.module.css"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import OperationsClient from './OperationsClient/OperationsClient';
import { getClientByName } from '../../../api/api';
import { useDispatch } from 'react-redux';
import { setDataClient } from '../../../store/client/client';

// TODO: fix result when clicking on search 
const SearchClient = () => {
    const {register, handleSubmit, reset} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const searchClient = async (data) => {
      console.log(data)
      const response = await getClientByName(data)
      if(response){
        console.log(response)
        dispatch(setDataClient(response))
        navigate("/admin/options")
      } else {
        console.log("Не удалось найти клиента.")
      }
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
                  <label htmlFor='numberId'>Номер телефона</label>
                  <input id='numberId' type='text'  {...register("phone")}/>
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
