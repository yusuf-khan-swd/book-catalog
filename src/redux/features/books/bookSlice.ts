import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook: (state, action) => {
      console.log(action.payload);
      console.log(state);
    },
  },
});

export const { addBook } = bookSlice.actions;

export default bookSlice.reducer;
