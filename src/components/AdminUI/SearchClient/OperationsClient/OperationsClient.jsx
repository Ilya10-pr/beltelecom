import React, { useEffect, useState } from 'react'
import style from "./OperationsClient.module.css";
import AddDocument from './AddDocument/AddDocument';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import CustomBtn from '../../../CustomComponents/CustomBtn';
import { useNavigate } from 'react-router-dom';
import { createAgreement } from '../../../../api/api';
const mockUserData = {
  name: "Прибыльский Илья Витальевич",
  phone: "+375298813723",
  passport: "12343214321",
  numClient: "1234567"
};




const OperationsClient = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      passport: '',
      numClient: '',
      street: '',
      house: '',
      flat: '',
      title: ''
    });
    const navigate= useNavigate()
    const foundClient = useSelector((state) => state.client.foundClient)
    
    useEffect(() => {
        setUserData(foundClient);
        setFormData({
          name: foundClient?.surname + " " + foundClient?.name + " " + foundClient?.patronymic || '',
          phone: foundClient?.phone || '',
          passport: foundClient?.passport || '',
          numClient: foundClient?.id.match(/\d+/g).join("").slice(0, 7) || '',
          street: foundClient?.adress[0]?.street || '',
          house: foundClient?.adress[0]?.house || '',
          flat: foundClient?.adress[0]?.flat || '',
          title: foundClient?.record[0]?.service
        });

    }, [foundClient]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    if (!userData) {
      return <div className={style.loading}>Перейдите в поиск клиента.</div>;
    }

    const saveAgreement = async () => {
      console.log(foundClient.id, formData)
      const response = await createAgreement(foundClient.id, formData).catch(error => console.log("Ошибка"))
      if(response){
        console.log(response)
      }
      navigate("/admin/add")
    }
  
  return (
    <div className={style.wrapperOperations}>
        <div className={style.inform}>
        <div className={style.item}>
          <span>ФИО:</span> 
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        
        <div className={style.item}>
          <span>Номер телефона:</span>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        
        <div className={style.item}>
          <span>Паспортные данные:</span> 
          <input
            name="passport"
            value={formData.passport}
            onChange={handleInputChange}
            placeholder={!formData.passport ? "Введите паспортные данные" : ""}
          />
        </div>
        
        <div className={style.item}>
          <span>Номер клиента:</span> 
          <input
            name="numClient"
            value={formData.numClient}
            onChange={handleInputChange}
            placeholder={!formData.numClient ? "Введите номер клиента" : ""}
          />
        </div>
        <div className={style.item}>
          <span>Улица:</span> 
          <input
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            placeholder={!formData.street ? "Введите улицу" : ""}
          />
        </div>
        <div className={style.item}>
          <span>Дом:</span> 
          <input
            name="house"
            value={formData.house}
            onChange={handleInputChange}
            placeholder={!formData.house ? "Введите дом" : ""}
          />
        </div>
        <div className={style.item}>
          <span>Квартира:</span> 
          <input
            name="flat"
            value={formData.flat}
            onChange={handleInputChange}
            placeholder={!formData.flat ? "Введите квартиру" : ""}
          />
        </div>
      </div>
        <button className={style.add} onClick={() => setIsOpen(true)}>Добавить документ</button>
        <div>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Тип документа</th>
                <th>Ксерокопия документа</th>
                <th>Номер приложения</th>
                <th>Описание</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
                {foundClient.document.map((document) => (
              <tr key={document.id}>
                <td>{document.documentType}</td>
                <td>{document.documentFile.slice(0,9) + "." + document.documentFile.split('.').pop()}</td>
                <td>{document.id.match(/\d+/g).join("").slice(0, 7)}</td>
                <td>{document.description}</td>
                <td>{document.date}</td>
              </tr>
                ))}
            </tbody>
          </table>
        </div>
        <CustomBtn handleClick={() => saveAgreement()} text={"Сохранить"} />
        {isOpen && <AddDocument passport={formData.passport} client={foundClient} setIsOpen={setIsOpen} /> }
    </div>
  )
};

export default OperationsClient
