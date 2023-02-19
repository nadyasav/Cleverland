/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL, REQUEST_ERRORS, REQUEST_STATUS } from '../constants';

interface ICategory {
  name: string;
  path: string;
  id: number;
}

interface ICategoriesSlice {
  categories: ICategory[];
  categoriesStatus: string;
  categoriesError: string;
}

export const fetchCategories = createAsyncThunk<ICategory[], void, { rejectValue: string }>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) =>
    fetch(`${API_URL}/api/categories`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((response) => response)
      .catch(() => rejectWithValue(REQUEST_ERRORS.common)),
  {
    condition: (_, { getState }) => {
      const { categories } = getState() as { categories: ICategoriesSlice };

      if (categories.categoriesStatus === REQUEST_STATUS.pending) {
        return false;
      }

      return true;
    },
  }
);

const initialState: ICategoriesSlice = {
  categories: [],
  categoriesStatus: '',
  categoriesError: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategoriesError: (state, action) => {
      state.categoriesError = action.payload;
    },
    resetCategoriesStatus: (state, action) => {
      state.categoriesStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.categoriesStatus = REQUEST_STATUS.pending;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categoriesStatus = REQUEST_STATUS.fulfilled;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categoriesStatus = REQUEST_STATUS.rejected;
      if (action.payload) {
        state.categoriesError = action.payload;
      }
    });
  },
});

export const { setCategories, setCategoriesError, resetCategoriesStatus } = categoriesSlice.actions;
