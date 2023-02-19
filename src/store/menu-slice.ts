import { createSlice } from '@reduxjs/toolkit';

const initialState: { menuState: boolean } = {
  menuState: false,
};

export const menuSlice = createSlice({
  name: 'menuState',
  initialState,
  reducers: {
    setMenuState: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.menuState = action.payload;
    },
  },
});

export const { setMenuState } = menuSlice.actions;
