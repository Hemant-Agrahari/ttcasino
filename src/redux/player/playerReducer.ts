import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
  avatar: number;
}

const initialState: PlayerState = {
  avatar: 0,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    updateAvatar: (state, action: PayloadAction<number>) => {
      state.avatar = action.payload;
    },
  },
});

export const { updateAvatar } = playerSlice.actions;
export default playerSlice.reducer;