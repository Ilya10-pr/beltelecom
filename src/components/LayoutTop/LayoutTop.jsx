import React from 'react'
import CustomLink from '../CustomComponents/CustomSectionLinks';
import { FaPhone } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import style from "./LayoutTop.module.css";
import { Link } from 'react-router-dom';

const LayoutTop = () => {
  const isAdmin = true
  return (
    <>
      <div className={style.navTop}>
        <div className={style.navInner}>
          <Link to="about">О компании</Link>
          <div>
            <input />
            <IoSearch className={style.icon} />
          </div>
          {!isAdmin ? <Link to="home" >На главную</Link> : <Link to="login" >Войти</Link>}
          
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
