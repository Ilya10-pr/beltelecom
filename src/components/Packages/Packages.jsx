import React from 'react'
import style from "./Packages.module.css"
import { Link } from 'react-router-dom';
import PopupChannels from './PopupChannels/PopupChannels';

const Packages = ({name, price, description}) => {


  return (
    <div className={style.card}>
        <div className={style.description}>
        <Link to={"/service/operation"}>
          <div className={style.title}>{name}</div>
          </Link>
            <div  className={style.item}>{description}</div>
        <PopupChannels />
        </div>
        <div className={style.price}>
            {price} р./мес. 
        </div>
      </div>
  )
};

export default Packages;
