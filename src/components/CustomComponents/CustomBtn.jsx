import React from 'react'
import style from "./CustomElements.module.css"
const CustomBtn = ({error = false, handleClick, text}) => {
  return (
        <button disabled={error} className={!error ? style.customBtn : style.disabled} onClick={handleClick}>{text}</button>
  )
};

export default CustomBtn
