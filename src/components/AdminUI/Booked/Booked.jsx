import React from 'react'
import style from "./Booked.module.css"
import Ticket from '../../ServiceInform/Ticket/Ticket';
import {  useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBookedFromList, getAllRecord } from '../../../api/api';
import toast from 'react-hot-toast';


const Booked = () => {
  const queryClient = useQueryClient()
  const {data, isLoading, isError, error} = useQuery({queryKey: ["booked"], queryFn: () => getAllRecord()})
 
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке данных: {error.message}</div>;
  

  const deleteBooked = async (id) => {
    try {
      const response = await deleteBookedFromList(id)
      if(!response){
        toast.error("Ошибка, попробуйте позже...");
        return
      }
      queryClient.invalidateQueries(["booked"])
      toast.success("Запись снята!")
    } catch (error) {
      console.log(error)
    }
  }
  const records = data.filter((client) => client.record.length !== 0)
  if (records.length === 0) return <div>Забронированного времени нет</div>;
  return (
    <div className={style.wrapperBooked}>
      {records.map((client) => (
        <Ticket data={client} isButton={true} deleteBooked={deleteBooked}/>
      ))}
      </div>
  )
};

export default Booked
