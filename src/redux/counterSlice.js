import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem('todos')?JSON.parse(localStorage.getItem('todos')):[],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    todoAdd:(state, action) => {
      state.value.push(action.payload)

    },
    todoCheck: (state, action) => {
      if (action.payload.status == true) {
        {
          state.value = state.value.map(el => {
            if (el.id == action.payload.id) {
              el = action.payload;
            }
            return el;
          });
      } 
      } else if (action.payload.status == false) {
        {
          state.value = state.value.map(el => {
            if (el.id == action.payload.id) {
              el = action.payload;
            }
            return el;
          });
      }  
      }
        
  },
    todoDelete: (state, action) => {
      state.value = state.value.filter(el => el.id != action.payload);
    },
  },
})

export const { todoAdd, todoDelete, todoCheck } = counterSlice.actions

export default counterSlice.reducer