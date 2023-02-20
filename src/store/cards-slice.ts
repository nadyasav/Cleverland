/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL, REQUEST_ERRORS, REQUEST_STATUS } from '../constants';
import { ICard } from '../types/custom-types';

interface ICardsSlice {
  cards: ICard[];
  cardsStatus: string;
  cardsError: string;
}

export const fetchCards = createAsyncThunk<ICard[], void, { rejectValue: string }>(
  'cards/fetchCards',
  async (_, { rejectWithValue }) =>
    fetch(`${API_URL}/api/books`)
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
      const { cards } = getState() as { cards: ICardsSlice };

      if (cards.cardsStatus === REQUEST_STATUS.pending) {
        return false;
      }

      return true;
    },
  }
);

const initialState: ICardsSlice = {
  cards: [],
  cardsStatus: '',
  cardsError: '',
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards = action.payload;
    },
    setCardsError: (state, action) => {
      state.cardsError = action.payload;
    },
    resetCardsStatus: (state, action) => {
      state.cardsStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.cardsStatus = REQUEST_STATUS.pending;
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.cardsStatus = REQUEST_STATUS.fulfilled;
      state.cards = action.payload;
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.cardsStatus = REQUEST_STATUS.rejected;
      if (action.payload) {
        state.cardsError = action.payload;
      }
    });
  },
});

export const { setCards, setCardsError, resetCardsStatus } = cardsSlice.actions;
