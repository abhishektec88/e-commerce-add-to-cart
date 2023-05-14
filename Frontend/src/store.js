import { configureStore } from '@reduxjs/toolkit'
import CartSlicer from './Slicer/CartSlicer'

export const store = configureStore({
  reducer: {
    cartCount: CartSlicer
  },
})