import React, { useEffect, useState } from 'react';
import style from "./Packages.module.css";
import Packages from './Packages';
import { packages } from '../../helpers/itemLink';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllServices } from '../../api/api';
import { staticSearch } from '../../helpers/itemLink';
import CustomBtn from '../CustomComponents/CustomBtn';

const PackagesContainer = () => {
  const url = useLocation()
  const [serviceData, setServiceData] = useState([]);
  const [selectedTariff, setSelectedTariff] = useState(null);
  const path = url.pathname.split("/")[2]
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["service", path],
    queryFn: () => getAllServices(path === "package" ? "package" : "service")});

    useEffect(() => {
      if (data) {
        const filtered = data.filter((item) => item.category === path);
        setServiceData(filtered);
      }
    }, [data, path]);
  
    const handleTariffSelect = (tariffName) => {
      
      setSelectedTariff(tariffName);
      
      if (!tariffName) {
        setServiceData(data.filter(item => item.category === path));
        return;
      }
      
      // Фильтруем по выбранному тарифу
      const filtered = data.filter(item => 
        item.category === path && 
        item.type === tariffName // предполагая, что у каждого item есть поле tariff
      );
      setServiceData(filtered);
    };


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

  const searchBtn = staticSearch.find(t => t.id === path)
  console.log(path)
  return (
    <div className={style.wrapperPackage}>
      {searchBtn && <div className={style.searchBtn}>
        <button onClick={() => handleTariffSelect()}>Все тарифы</button>
        {searchBtn.btnServices.map(t => (
        <>
          <button onClick={() => handleTariffSelect(t.name)}>{t.name}</button>
        </>
        ))}
      </div>}
      
        {serviceData.length !== 0 ? serviceData?.map((item) => (
          <Packages 
              id={item.id} 
              name={item.name} 
              price={item.price} 
              description={path === "package" ? item.services : item.description} 
              path={path}
              key={item.id} />
        )): <div>Найденных тарифов нет</div>}
    </div>
  )
};

export default PackagesContainer
