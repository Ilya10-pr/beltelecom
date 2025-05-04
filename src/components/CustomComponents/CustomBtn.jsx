import React from 'react'
import style from "./CustomElements.module.css"
const CustomBtn = ({ handleClick, text}) => {
  return (
        <button className={style.customBtn} onClick={handleClick}>{text}</button>
  )
};

export default CustomBtn
