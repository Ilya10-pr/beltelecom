import React from 'react';
import style from "./Ticket.module.css";
import { useSelector } from 'react-redux';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getClientById } from '../../../api/api';
import Ticket from './Ticket';

const TicketContainer = () => {
  const {id}  = useParams()
  const {data, isLoading, isError, error} = useQuery({queryKey: ["client", id], queryFn:() => getClientById(id) })
  console.log(data)
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке данных: {error.message}</div>;
  if (!data || data.length === 0) return <div>Данные не найдены</div>;
  return (
    <div className={style.wrapperTicket}>
      <Ticket data={data}/>

    </div>
  )
};

export default TicketContainer
