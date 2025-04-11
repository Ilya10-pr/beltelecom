import React from 'react'
import CustomLink from '../CustomComponents/CustomLink';
import style from "./SectionLinks.module.css"

const homeStepper = [
  {path: "package", name: "Пакеты"},
  {path: "internet", name: "Интернет"},
  {path: "tv", name: "Телевидение"},
  {path: "smart", name: "Умный дом"},
  {path: "phone", name: "Телефон"},
  {path: "hosting", name: "Хостинг"},
  {path: "observe", name: "Видеоконтроль"}
]

const SectionLinks = () => {
  return (
    <div className={style.wrapperLinks}>
        <div>
        {homeStepper.map((step) => (
          <CustomLink key={step.path} link={"home/" + step.path} item={step.name} />
        ))}
        </div>
      </div>
  )
};

export default SectionLinks
