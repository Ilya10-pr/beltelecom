import React, { useEffect, useState } from 'react';
import style from "./Packages.module.css";
import Packages from './Packages';
import { packages } from '../../helpers/itemLink';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllPackages, getAllServices } from '../../api/api';

const PackagesContainer = () => {
  const [services, setServices] = useState([])
  const url = useLocation()
  const path = url.pathname.split("/")[2]

  useEffect(() =>{
    try {
      if(path === "package"){
        getAllPackages().then(data => setServices(data)).catch((error) =>console.log(error))
        return
      } else {
        getAllServices().then(data => setServices(data)).catch((error) =>console.log(error))
      }  
    } catch (error) {
      console.log(error)
    }
  }, [])

  if(!services) {
    return <div> Не найдено</div>
  }
  const items = services.filter((item) => item.category === path)

  return (
    <div className={style.wrapperPackage}>
        {services.filter((item) => item.category === path).map((item) => (
          <Packages name={item.name} price={item.price} description={item.description} key={item.id} />
        ))}
    </div>
  )
};

export default PackagesContainer
