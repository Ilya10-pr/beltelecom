import React, { useEffect, useState } from 'react'
import style from "./OperationsClient.module.css";
import AddDocument from './AddDocument/AddDocument';
import { useSelector } from 'react-redux';
import CustomBtn from '../../../CustomComponents/CustomBtn';
import { useNavigate } from 'react-router-dom';
import { createAgreement, deleteBookedFromList } from '../../../../api/api';
import toast from 'react-hot-toast';


const OperationsClient = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const [passport, setPassport] = useState('');
  const [error, setError] = useState('');

  
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      passport: '',
      numClient: '',
      title: ''
    });
    const navigate= useNavigate()
    const foundClient = useSelector((state) => state.client.foundClient)
    const dataAdress = `ул. ${foundClient?.adress[0]?.street}, д. ${foundClient?.adress[0]?.house}, кв. ${foundClient?.adress[0]?.flat}`
    useEffect(() => {
        setUserData(foundClient);
        setFormData({
          name: foundClient?.surname + " " + foundClient?.name + " " + foundClient?.patronymic || '',
          phone: foundClient?.phone || '',
          passport: foundClient?.passport || '',
          numClient: foundClient?.id.match(/\d+/g).join("").slice(0, 7) || '',
          title: foundClient?.record[0]?.service
        });

    }, [foundClient]);
  

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      if (value.length !== 14) {
        setError('Данные не корректны');
        return
      }
      setError('');
    };
  
    if (!userData) {
      return <div className={style.loading}>Перейдите в поиск клиента.</div>;
    }

    const saveAgreement = async () => {
      try {
        const response = await createAgreement(foundClient.id, formData)
        if(!response){
          toast.error("Ошибка, попробуйте позже...")
          return
        }
        toast.success("Договор сохранен!")
        await deleteBookedFromList(response.id)
        navigate("/admin/add")
      } catch (error) {
        console.log(error)
      }
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
            type='text'
            name="passport"
            value={formData.passport}
            onChange={handleInputChange}
            placeholder={!formData.passport ? "Введите паспортные данные" : ""}
            onKeyPress={(e) => {
              const isValidChar = /^[0-9!@#$%^&*()_+\-=\]{};':"\\|,.<>?]*$/.test(e.key);
              if (!isValidChar) {
                e.preventDefault();
              }
            }}
          />
          {error && <p className={style.errors}>{error}</p>}
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
      </div>
        <button className={style.add} onClick={() => setIsOpen(true)}>Добавить документ</button>
        <div>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Тип документа</th>
                <th>Ксерокопия</th>
                <th>Номер приложения</th>
                <th>Описание</th>
                <th>Адрес</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
                {foundClient.document.map((document) => (
              <tr key={document.id}>
                <td data-label="Тип документа">{document.documentType}</td>
                <td data-label="Ксерокопия">{document.documentFile.slice(0,9) + "." + document.documentFile.split('.').pop()}</td>
                <td data-label="Номер приложения">{document.id.match(/\d+/g).join("").slice(0, 7)}</td>
                <td data-label="Описание">{document.description}</td>
                <td data-label="Адресс">{dataAdress}</td>
                <td data-label="Дата">{document.date.slice(0, 10)}</td>
              </tr>
                ))}
            </tbody>
          </table>
        </div>
        <CustomBtn error={error ? true : false} handleClick={() => saveAgreement()} text={"Сохранить"} />
        {isOpen && <AddDocument passport={formData.passport} client={foundClient} setIsOpen={setIsOpen} /> }
    </div>
  )
};

export default OperationsClient
