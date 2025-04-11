import React from 'react'
import style from "./Packages.module.css"
import Packages from './Packages';

const PackagesContainer = ({service}) => {
  return (
    <div className={style.wrapperPackage}>
      <h2>Пакеты</h2>
        {[1, 2, 3].map((value) => (
          <Packages key={value} service={service} />
        ))}
    </div>
  )
};

export default PackagesContainer
