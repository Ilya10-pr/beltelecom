import { configureStore } from '@reduxjs/toolkit'
import  ticketSlice  from './service/service'
import  clientSlice  from './client/client'

export default configureStore({
  reducer: {
    ticket: ticketSlice,
    client: clientSlice
  },
})