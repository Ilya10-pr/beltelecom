import React from 'react'
import CustomBtn from '../../CustomComponents/CustomBtn';
import style from "./AddService.module.css"

const AddService = ({services}) => {

  const addService = () => {
    console.log("Add service")
  }
  return (
    <div className={style.add}>
      <p>Выберите услугу</p>
      <CustomBtn handleClick={addService} services={services} />
    </div>
  )
};

export default AddService
