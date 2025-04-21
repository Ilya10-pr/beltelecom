import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAuth: null,
  },
  reducers: {
    logInAdmin: (state, action) => {
      state.isAuth = action.payload
    },
    lohOutAdmin: (state) => {
      state.isAuth = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { logInAdmin, lohOutAdmin } = adminSlice.actions

export default adminSlice.reducer