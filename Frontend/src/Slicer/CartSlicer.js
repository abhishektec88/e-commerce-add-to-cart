import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const cartSlice = createSlice({
  name: 'cartCount',
  initialState,
  reducers: {
    cartCount: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { cartCount} = cartSlice.actions

export default cartSlice.reducer