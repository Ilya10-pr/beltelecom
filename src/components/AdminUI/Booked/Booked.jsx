import React from 'react'
import style from "./Booked.module.css"
import Ticket from '../../ServiceInform/Ticket/Ticket';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBookedFromList, getAllClients, getAllRecord } from '../../../api/api';


const Booked = () => {
  const queryClient = useQueryClient()
  const {data, isLoading, isError, error} = useQuery({queryKey: ["booked"], queryFn: () => getAllRecord()})
 
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке данных: {error.message}</div>;
  if (!data || data.length === 0) return <div>Забронированного времени нет</div>;
  const deleteBooked = async (id) => {
    const response = await deleteBookedFromList(id)
    if(response){
      queryClient.invalidateQueries(["booked"])
      console.log("Удалено успешно")
    }
  }
  const records = data.filter((client) => client.record.length !== 0)
  return (
    <div className={style.wrapperBooked}>
      {records.map((client) => (
        <Ticket data={client} isButton={true} deleteBooked={deleteBooked}/>
      ))}
      </div>
  )
};

export default Booked
