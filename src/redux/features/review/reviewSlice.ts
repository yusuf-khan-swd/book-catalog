import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    addReview: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const { addReview } = reviewSlice.actions;

export default reviewSlice.reducer;
