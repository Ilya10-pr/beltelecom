import React, { useState } from 'react'
import style from "./OperationsClient.module.css";
import AddDocument from './AddDocument/AddDocument';
export const informClients = [{name: "Прибыльский Илья Витальевич", phone: "1234567", passport: "12343214321",
                          numClient: "1234567", document: "паспорт", copy: "паспорт.pdf", numberApp: "123456789", 
                          description: "Пакет услуг ЯСНО 500", date: "02/03/2023"},
                          {name: "Прибыльский Илья Витальевич", phone: "1234567", passport: "12343214321",
                            numClient: "1234567", document: "паспорт", copy: "паспорт.pdf", numberApp: "123456789", 
                            description: "Пакет услуг ЯСНО 500", date: "02/03/2023"}]


const OperationsClient = () => {
    const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={style.wrapperOperations}>
        <div className={style.inform}>
            <div className={style.item}>
              <span>ФИО:</span> 
              <p>{informClients[0].name}</p>
            </div>
          <div className={style.item}>
            <span>Номер телефона: </span>
            <p>{informClients[0].phone}</p>
          </div>
          <div className={style.item}>
            <span>Паспортные данные:</span> 
            <p>{informClients[0].passport}</p>
          </div>
          <div className={style.item}>
            <span>Номер клиента:</span> 
            <p>{informClients[0].numClient}</p>
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
                {informClients.map((client) => (
              <tr>
                <td>{client.document}</td>
                <td>{client.copy}</td>
                <td>{client.numberApp}</td>
                <td>{client.description}</td>
                <td>{client.date}</td>
              </tr>
                ))}
            </tbody>
          </table>
        </div>
        {isOpen && <AddDocument setIsOpen={setIsOpen} /> }
    </div>
  )
};

export default OperationsClient
