import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import productReducer from './features/books/productSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
