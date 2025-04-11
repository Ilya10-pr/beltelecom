import React from 'react'
import style from "./Packages.module.css"
import { Link } from 'react-router-dom';
import PopupChannels from './PopupChannels/PopupChannels';

const Packages = ({service}) => {


  if(!service){
    return <div>На этапе разработки</div>
  }

  return (
    <div className={style.card}>
        <div className={style.description}>
        <Link to={"/service/operation"}>
          <div className={style.title}>ЯСНА 500</div>
          </Link>
        {service.map((value)=> (
          <div key={value + Date.now()} className={style.item}>{value}</div>
        ))}
        <PopupChannels />
        </div>
        <div className={style.price}>
            64.70 р./мес. 
        </div>
      </div>
  )
};

export default Packages;
