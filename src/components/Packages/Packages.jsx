import React from 'react'
import style from "./Packages.module.css"
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setServiceId } from '../../store/service/service';

const Packages = ({name, price, description, id, path}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const selectService = (id) => {
    dispatch(setServiceId({id, name}))
    navigate("/service/operation")
  }

  return (
    <div className={style.card}>
        <div className={style.description}>
          <button className={style.btn} onClick={() => selectService(id)}>
            <div className={style.title}>{name}</div>
          </button>
          {path === "package" 
                       ? description?.map((item) => (
                        <div key={item.id} className={style.item}>{item.description}</div>
                      ))
                       : <div className={style.item}>{description}</div> }
          
        </div>
        <div className={style.price}>
            {price} р./мес. 
        </div>
      </div>
  )
};

export default Packages;
