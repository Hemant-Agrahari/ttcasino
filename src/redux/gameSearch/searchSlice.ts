// src/store/slices/searchSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface _props {
  searchQuery: string;
}

const initialState: _props = {
  searchQuery: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    handleSearch: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload.trim();
    },
    clearQuery: (state) => {
      state.searchQuery = '';
    },
  },
});

export const { handleSearch, clearQuery } = searchSlice.actions;
export default searchSlice.reducer;
