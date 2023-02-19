import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { Preloader } from '../../components/preloader/preloader';
import { REQUEST_ERRORS, REQUEST_STATUS, TOAST_SETTINGS } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchCards, setCardsError } from '../../store/cards-slice';
import { fetchCategories, setCategoriesError } from '../../store/categories-slice';

import { Cards } from './cards/cards';
import { Filters } from './filters/filters';

import styles from './main-page.module.css';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { categories, categoriesStatus, categoriesError } = useAppSelector((state) => state.categories);
  const { cards, cardsStatus, cardsError } = useAppSelector((state) => state.cards);
  const [viewCardsType, setViewCardsType] = useState('tile');

  useEffect(
    () => () => {
      dispatch(setCategoriesError(''));
      dispatch(setCardsError(''));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  useEffect(() => {
    if (!cards.length) {
      dispatch(fetchCards());
    }
  }, [cards, dispatch]);

  useEffect(() => {
    if (categoriesStatus !== REQUEST_STATUS.pending && cardsStatus !== REQUEST_STATUS.pending) {
      if (categoriesError || cardsError) {
        toast.error(REQUEST_ERRORS.common, { toastId: 'mainPageToast' });
      }
    }
  }, [categoriesError, cardsError, categoriesStatus, cardsStatus]);

  const handleViewOnChange = (value: string) => {
    setViewCardsType(value);
  };

  return (
    <div className={styles.main_page}>
      {cards.length > 0 && categories.length > 0 && (
        <React.Fragment>
          <div className={styles.main_page__filters}>
            <Filters handleViewChange={handleViewOnChange} />
          </div>
          <div className={styles.main_page__cards}>
            <Cards dataCards={cards} viewType={viewCardsType} />
          </div>
        </React.Fragment>
      )}
      {(categoriesStatus === REQUEST_STATUS.pending || cardsStatus === REQUEST_STATUS.pending) && <Preloader />}
      <span data-test-id='error'>
        <ToastContainer {...TOAST_SETTINGS} />
      </span>
    </div>
  );
};
