/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL, REQUEST_ERRORS, REQUEST_STATUS } from '../constants';
import { IBook } from '../types/custom-types';
import { getLocalStorage } from '../utils/get-local-storage';

import { removeUser } from './authorization-slice';

interface IBookSlice {
  book: IBook | null;
  bookStatus: string;
  bookError: string;
}

export const fetchBook = createAsyncThunk<IBook, string, { rejectValue: string }>(
  'book/fetchBook',
  async (id, { rejectWithValue, dispatch }) =>
    fetch(`${API_URL}/api/books/${id}`, {
      method: 'GET',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${getLocalStorage('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((response) => response)
      .catch((error) => {
        if (error.statusCode === 403) {
          dispatch(removeUser());

          return rejectWithValue(REQUEST_ERRORS.common);
        }

        return rejectWithValue(REQUEST_ERRORS.common);
      }),
  {
    condition: (_, { getState }) => {
      const { book } = getState() as { book: IBookSlice };

      if (book.bookStatus === REQUEST_STATUS.pending) {
        return false;
      }

      return true;
    },
  }
);

const initialState: IBookSlice = {
  book: null,
  bookStatus: '',
  bookError: '',
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBook: (state, action) => {
      state.book = action.payload;
    },
    setBookError: (state, action) => {
      state.bookError = action.payload;
    },
    resetBookStatus: (state, action) => {
      state.bookStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.bookStatus = REQUEST_STATUS.pending;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.bookStatus = REQUEST_STATUS.fulfilled;
      state.book = action.payload;
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      state.bookStatus = REQUEST_STATUS.rejected;
      if (action.payload) {
        state.bookError = action.payload;
      }
    });
  },
});

export const { setBook, setBookError, resetBookStatus } = bookSlice.actions;
