import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    opened: false,
  }

  const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
      popupOpened(state) {
        state.opened = true; 
      },
      popupClosed(state) {
        state.opened = false; 
      }
    },
  })

  export default modalSlice.reducer

  export const { popupOpened, popupClosed } = modalSlice.actions