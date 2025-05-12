import React, { useState } from 'react'
import CustomBtn from '../../CustomComponents/CustomBtn';
import style from "../AddService/AddService.module.css"
import ModalDelete from './ModalDelete/ModalDelete';
import { servicesBtn } from '../../../helpers/itemLink';


const DeleteService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)


  return (
    <div className={style.delete}>
      <div className={style.title}>Выберите услугу</div>
      <div className={style.wrapperBtn}>
        {servicesBtn.map((btn) => (
          <>
            <CustomBtn handleClick={() => setIsModalOpen(btn.id)} key={btn.id} text={btn.name}/>
            {isModalOpen === btn.id && <ModalDelete point={btn.id} setIsModalOpen={setIsModalOpen} /> }
          </>
        ))}
      </div>
    </div>
  )
};

export default DeleteService
