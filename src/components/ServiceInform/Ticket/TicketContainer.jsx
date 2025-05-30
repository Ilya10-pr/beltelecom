import React, { useEffect, useState } from 'react';
import style from "./Ticket.module.css";
import {  useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getClientById } from '../../../api/api';
import Ticket from './Ticket';
import { useSelector } from 'react-redux';

const TicketContainer = () => {
  const {id}  = useParams()
  const dataClient = useSelector((state) => state.ticket);
  const [ticket, setTicket] = useState(dataClient)

  useEffect(() => {
    setTicket(dataClient)
  }, [dataClient])
  // const {data, isLoading, isError, error} = useQuery({queryKey: ["client", id], queryFn:() => getClientById(id) })

  // if (isLoading) return <div>Загрузка...</div>;
  // if (isError) return <div>Ошибка при загрузке данных: {error.message}</div>;
  // if (!data || data.length === 0) return <div>Данные не найдены</div>;

  return (
    <div className={style.wrapperTicket}>
      <Ticket ticket={ticket} allTickts={false}/>
    </div>
  )
};

export default TicketContainer
