import { configureStore } from '@reduxjs/toolkit'
import  adminSlice  from './user/slice'

export default configureStore({
  reducer: {
    admin: adminSlice
  },
})