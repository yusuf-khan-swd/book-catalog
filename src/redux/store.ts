import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';
import reviewReducer from './features/review/reviewSlice';
import userReducer from './features/user/userSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    review: reviewReducer,
    wishlist: wishlistReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
