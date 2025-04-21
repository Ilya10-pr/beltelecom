import React, { useState } from 'react'
import CustomBtn from '../../CustomComponents/CustomBtn';
import style from "./AddService.module.css"
import AddTariffModal from './AddTarifModal/AddTarifModal';
import { servicesBtn } from '../../../helpers/itemLink';

const AddService = ({services}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
  const addService = () => {
    setIsModalOpen(true)
    console.log("Add service")
  } 
  return (
    <div className={style.add}>
      <p>Выберите услугу</p>
      <div className={style.wrapperBtn}>
        {servicesBtn.map((btn) => (
          <>
            <CustomBtn handleClick={() => setIsModalOpen(btn.id)} key={btn.id} text={btn.name}/>
            {isModalOpen === btn.id && <AddTariffModal serviceId={btn.id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
          </>
        ))}
      </div>
    </div>
  )
};

export default AddService
