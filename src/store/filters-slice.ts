/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { SORT_TYPE } from '../constants';

const initialState: { sortType: string; searchField: string } = {
  sortType: SORT_TYPE.desc,
  searchField: '',
};

export const filtersSlice = createSlice({
  name: 'filtersState',
  initialState,
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSearchField: (state, action) => {
      state.searchField = action.payload;
    },
  },
});

export const { setSortType, setSearchField } = filtersSlice.actions;
