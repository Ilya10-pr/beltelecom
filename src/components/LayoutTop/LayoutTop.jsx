import React from 'react'
import CustomLink from '../CustomComponents/CustomLink';
import { FaPhone } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import style from "./LayoutTop.module.css";

const LayoutTop = () => {
  return (
    <>
      <div className={style.navTop}>
        <div className={style.navInner}>
          <CustomLink link={"about"} item={"О компании"}/>
          <div>
            <input />
            <IoSearch className={style.icon} />
          </div>
          <CustomLink link={"home"} item={"На главную"}/>
        </div>
      </div>
      <div className={style.navBottom}>
        <h2>БЕЛТЕЛЕКОМ</h2>
        <div className={style.navSupport}>
          <p>Служба технической и консультационной поддержки</p>
          <a href='tel:+123'><FaPhone /></a>
          <h3>123</h3>
        </div>
      </div> 
    </>
  )
};

export default LayoutTop
