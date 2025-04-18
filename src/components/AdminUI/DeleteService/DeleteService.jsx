import React from 'react'
import CustomBtn from '../../CustomComponents/CustomBtn';
import style from "../AddService/AddService.module.css"
const DeleteService = ({services}) => {

  const deleteService = () => {
    console.log("Delete service")
  }

  return (
    <div className={style.delete}>
      <p>Выберите услугу</p>
      <CustomBtn handleClick={deleteService} services={services} />
    </div>
  )
};

export default DeleteService
