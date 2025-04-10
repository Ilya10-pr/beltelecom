import React from 'react'
import { descriptionServices, itemLinkServices } from '../../helpers/itemLink';
import style from "./Packages.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import SectionLinks from '../SectionLinks/SectionLinks';

const Packages = () => {
  const navigate = useNavigate()

  const select = () => {
    navigate("/operation")
  }
  return (
    <button onClick={() => select()}>
      <div className={style.card}>
        <div className={style.description}>
          <div className={style.title}>ЯСНА 500</div>
        {descriptionServices.package.map((value)=> (
          <div key={value + Date.now()} className={style.item}>{value}</div>
        ))}
        </div>
        <div className={style.price}>
            64.70 р./мес. 
        </div>
      </div>
    </button>

    
    
  )
};

export default Packages
