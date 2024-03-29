import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/counterSlice.js'

export const store = configureStore({
  reducer: {
    todos: counterReducer,
  },
})