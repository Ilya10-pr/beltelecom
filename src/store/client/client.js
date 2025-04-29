import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  foundClient: null
};
export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setDataClient: (state, action) => {
      state.foundClient = action.payload
    },
    resetTicket: () => initialState
  },
})

// Action creators are generated for each case reducer function
export const { setDataClient, resetTicket } = clientSlice.actions

export default clientSlice.reducer