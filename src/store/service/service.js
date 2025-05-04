import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  service: null,
  serviceId: null,
  action: null,
  date: null,
  time: null,
  infoUser: null
};
export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setServiceId: (state, action) => {
      state.serviceId = action.payload.id
      state.service = action.payload.name
    },
    setService: (state, action) => {
      state.action = action.payload
    },
    setDate: (state, action) => {
      state.date = action.payload.date
      state.time = action.payload.time
    },
    resetTicket: () => initialState
  },
})

// Action creators are generated for each case reducer function
export const { setServiceId, setService, setDate, setInfoUser, resetTicket } = ticketSlice.actions

export default ticketSlice.reducer