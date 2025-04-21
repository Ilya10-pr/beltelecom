import React, { useState } from 'react'
import CustomBtn from '../../CustomComponents/CustomBtn';
import style from "../AddService/AddService.module.css"
import ModalDelete from './ModalDelete/ModalDelete';
import { servicesBtn } from '../../../helpers/itemLink';
const DeleteService = ({services}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const deleteService = () => {
    setIsModalOpen(true)
    console.log("Delete service")
  }

  return (
    <div className={style.delete}>
      <p>Выберите услугу</p>
      <div className={style.wrapperBtn}>
        {servicesBtn.map((btn) => (
          <>
            <CustomBtn handleClick={() => setIsModalOpen(btn.id)} key={btn.id} text={btn.name}/>
            {isModalOpen === btn.id && <ModalDelete setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} /> }
          </>
        ))}
      </div>
    </div>
  )
};

export default DeleteService
