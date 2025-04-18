import React from 'react'
import style from "./CustomElements.module.css"
const CustomBtn = ({handleClick, services}) => {
  return (
    <div className={style.wrapperBtn}>
      {services.map((text) => (
        <button key={text} onClick={handleClick}>{text}</button>
      ))}
    </div>
  )
};

export default CustomBtn
