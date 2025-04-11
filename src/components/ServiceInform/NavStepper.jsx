import React from 'react'
import style from "./NavStepper.module.css"
import CustomLink from '../CustomComponents/CustomLink';

const steps = [
  { path: 'service/operation', name: 'Выбор операции' },
  { path: 'service/date', name: 'Дата и время' },
  { path: 'service/info', name: 'Личные данные' },
  { path: 'service/ticket', name: 'Запись' }
];

const NavStepper = () => {

  return (
    <div className={style.wrapperLinks}>
        <div>
        {steps.map((step, index) => (
          <CustomLink key={step.path} link={step.path} item={step.name} />
        ))}
        </div>
      </div>
  )
};

export default NavStepper
