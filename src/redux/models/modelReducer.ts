import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface models {
  isLoginModel: boolean;
  isSearchModalOpen: boolean;
  isSidebar: boolean;
  loginModelTab: number;
  previousRoute: string;
}

const initialState: models = {
  isLoginModel: false,
  isSearchModalOpen: false,
  isSidebar: false,
  loginModelTab: 0,
  previousRoute: '/',
};

const modelsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOpenLoginModel: (state) => {
      state.isLoginModel = true;
    },
    setCloseLoginModel: (state) => {
      state.isLoginModel = false;
    },

    setLoginModelTab: (state, action: PayloadAction<number>) => {
      state.loginModelTab = action.payload;
    },

    setPreviousRoute: (state, action: PayloadAction<string>) => {
      console.log(action.payload, 'payload');
      state.previousRoute = action.payload;
    },

    openSearchModal: (state) => {
      state.isSearchModalOpen = true;
    },

    closeSearchModal: (state) => {
      state.isSearchModalOpen = false;
    },

    toggleSearchModal: (state) => {
      state.isSearchModalOpen = !state.isSearchModalOpen;
    },

    setOpenSidebar: (state) => {
      state.isSidebar = true;
    },
    setCloseSidebar: (state) => {
      state.isSidebar = false;
    },

    setToggleSidebar: (state) => {
      state.isSidebar = !state.isSidebar;
    },
  },
});

export const {
  setOpenLoginModel,
  setPreviousRoute,
  setCloseLoginModel,
  setLoginModelTab,
  openSearchModal,
  closeSearchModal,
  toggleSearchModal,
  setOpenSidebar,
  setCloseSidebar,
  setToggleSidebar,
} = modelsSlice.actions;
export default modelsSlice.reducer;
