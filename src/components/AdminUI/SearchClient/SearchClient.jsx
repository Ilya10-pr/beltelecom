import React from 'react'
import style from "./SearchClient.module.css"
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getClientByName } from '../../../api/api';
import { useDispatch } from 'react-redux';
import { setDataClient } from '../../../store/client/client';
import toast from 'react-hot-toast';


const SearchClient = () => {
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const searchClient = async (data) => {
      try {
        const response = await getClientByName(data)
        if(!response){
          toast.error("Клиент с такими данными не найден!")
        } 
        dispatch(setDataClient(response))
        navigate("/admin/options") 
      } catch (error) {
        console.log(error)
        toast.error("Клиент с такими данными не найден!")
      }
    }
      return (
        <div className={style.form}>
            <div className={style.title}>Найти клиента</div>
            <form action={handleSubmit(searchClient)}>
              <div className={style.innerForm}>
                <div className={style.item}>
                  <label htmlFor="nameId">Имя</label>
                  <input 
                    id='nameId' 
                    type="text"  
                    {...register("name")}
                    onKeyPress={(e) => {
                      const isValidChar = /^[a-zA-Zа-яА-ЯёЁ\s]$/.test(e.key);
                      if (!isValidChar) {
                        e.preventDefault();
                      }
                    }}
                    />
                </div>
                <div className={style.item}>
                  <label htmlFor='surnameId'>Фамилия</label>
                  <input 
                    id='surnameId' 
                    type='text' 
                    {...register("surname")}
                    onKeyPress={(e) => {
                      const isValidChar = /^[a-zA-Zа-яА-ЯёЁ\s]$/.test(e.key);
                      if (!isValidChar) {
                        e.preventDefault();
                      }
                    }}/>
                </div>
                <div className={style.item}>
                  <label htmlFor='patronymicId'>Отчество</label>
                  <input 
                    id='patronymicId' 
                    type='text'  
                    {...register("patronymic")}
                    onKeyPress={(e) => {
                      const isValidChar = /^[a-zA-Zа-яА-ЯёЁ\s]$/.test(e.key);
                      if (!isValidChar) {
                        e.preventDefault();
                      }
                    }}/>
                </div>
                <div className={style.item}>
                  <label htmlFor='numberId'>Номер телефона</label>
                  <input 
                    id='numberId' 
                    type='text'  
                    {...register("phone")}
                    onKeyPress={(e) => {
                      const isValidChar = /^[0-9!@#$%^&*()_+\-=\]{};':"\\|,.<>?]*$/.test(e.key);
                      if (!isValidChar) {
                        e.preventDefault();
                      }
                    }}/>
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
