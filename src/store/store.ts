import { configureStore } from '@reduxjs/toolkit';

import { bookSlice } from './book-slice';
import { cardsSlice } from './cards-slice';
import { categoriesSlice } from './categories-slice';
import { menuSlice } from './menu-slice';

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    categories: categoriesSlice.reducer,
    cards: cardsSlice.reducer,
    book: bookSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
