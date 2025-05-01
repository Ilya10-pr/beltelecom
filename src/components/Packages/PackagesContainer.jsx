import React, { useEffect, useState } from 'react';
import style from "./Packages.module.css";
import Packages from './Packages';
import { packages } from '../../helpers/itemLink';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllServices } from '../../api/api';

const PackagesContainer = () => {
  const url = useLocation()
  const path = url.pathname.split("/")[2]
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["service", path],
    queryFn: () => getAllServices(path === "package" ? "package" : "service")
  });

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    console.error("Ошибка при загрузке данных:", error);
    return <div>Ошибка при загрузке данных</div>;
  }

  // Если данные загружены, но пустые
  if (!data || data.length === 0) {
    return <div>Данные не найдены</div>;
  }


  return (
    <div className={style.wrapperPackage}>
        {data.filter((item) => item.category === path).map((item) => (
          <Packages 
              id={item.id} 
              name={item.name} 
              price={item.price} 
              description={path === "package" ? item.services : item.description} 
              path={path}
              key={item.id} />
        ))}
    </div>
  )
};

export default PackagesContainer
