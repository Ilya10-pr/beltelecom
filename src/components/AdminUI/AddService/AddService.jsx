import React, { useState } from 'react'
import CustomBtn from '../../CustomComponents/CustomBtn';
import style from "./AddService.module.css"
import AddTariffModal from './AddTarifModal/AddTarifModal';
import { servicesBtn } from '../../../helpers/itemLink';

const AddService = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={style.add}>
      <div className={style.title}>Выберите услугу</div>
      <div className={style.wrapperBtn}>
        {servicesBtn.map((btn) => (
          <>
            <CustomBtn key={btn.id} handleClick={() => setIsModalOpen(btn.id)}  text={btn.name}/>
            {isModalOpen === btn.id && <AddTariffModal serviceId={btn.id} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
          </>
        ))}
      </div>
    </div>
  )
};

export default AddService
