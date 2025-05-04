import React from 'react'
import CustomLink from '../CustomComponents/CustomSectionLinks';
import { FaPhone } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import style from "./LayoutTop.module.css";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const LayoutTop = () => {
  const navigate = useNavigate()
  const isAdmin = window.localStorage.getItem("token");
  const url = useLocation()
  const IP = true

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <div className={style.navTop}>
        <div className={style.navInner}>
          <Link to="home/package">Главная страница</Link>
          {IP ? (isAdmin ? <div className={style.admin}>
            <Link to="admin/add" >Админ панель</Link>
            <button className={style.logout} onClick={() => logOut()} >Выйти</button>
            </div> :  <Link to="login" >Войти</Link>) : null  }
        </div>
      </div>
      <div className={style.navBottom}>
        <h2>БЕЛТЕЛЕКОМ</h2>
        <div className={style.navSupport}>
          <p>Служба технической и консультационной поддержки</p>
          <a href='tel:+123'><FaPhone /></a>
          <div>123</div>
        </div>
      </div> 
    </>
  )
};

export default LayoutTop
