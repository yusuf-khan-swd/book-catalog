import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  abc: '',
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { addToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
