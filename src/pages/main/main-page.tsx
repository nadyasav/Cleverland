import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { Preloader } from '../../components/preloader/preloader';
import { FILTER_ERROR, REQUEST_ERRORS, REQUEST_STATUS, TOAST_SETTINGS } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchCards, setCards, setCardsError } from '../../store/cards-slice';
import { fetchCategories, setCategoriesError } from '../../store/categories-slice';
import { setSearchField } from '../../store/filters-slice';
import { ICard } from '../../types/custom-types';
import { getSortedCards } from '../../utils/get-sorted-cards';

import { Cards } from './cards/cards';
import { Filters } from './filters/filters';

import styles from './main-page.module.css';

export const MainPage = () => {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const { categories, categoriesStatus, categoriesError } = useAppSelector((state) => state.categories);
  const { cards, cardsStatus, cardsError } = useAppSelector((state) => state.cards);
  const { sortType, searchField } = useAppSelector((state) => state.filters);
  const [filteredCards, setFilteredCards] = useState<ICard[]>([]);
  const [viewCardsType, setViewCardsType] = useState('tile');
  const [categoryName, setCategoryName] = useState('Все книги');
  const [error, setError] = useState('');

  useEffect(
    () => () => {
      dispatch(setCategoriesError(''));
      dispatch(setCardsError(''));
      dispatch(setCards([]));
      dispatch(setSearchField(''));
    },
    [dispatch]
  );

  useEffect(() => {
    if (categories.length) {
      if (category === 'all') {
        setCategoryName('Все книги');
      } else {
        const catName = categories.find((item) => item.path === category);

        setCategoryName(catName ? catName.name : '');
      }
    } else {
      dispatch(fetchCategories());
    }
  }, [categories, category, dispatch]);

  useEffect(() => {
    let filteredCardsTemp = cards;

    if (cards.length) {
      filteredCardsTemp = getFilteredCardsByCategory(filteredCardsTemp, categoryName);
      filteredCardsTemp = getFilteredCardsBySearch(filteredCardsTemp, searchField);
      filteredCardsTemp = getSortedCards(filteredCardsTemp, sortType);
      setFilteredCards(filteredCardsTemp);
    } else {
      dispatch(fetchCards());
    }
  }, [cards, categoryName, sortType, searchField, dispatch]);

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

  function getFilteredCardsByCategory(dataCards: ICard[], name: string) {
    if (name) {
      if (name === 'Все книги') {
        return dataCards;
      }
      const cardsFiltered = dataCards.filter(
        (item) => item.categories && item.categories.find((categoryItem) => categoryItem === name)
      );

      if (cardsFiltered.length) {
        return cardsFiltered;
      }
      setError(FILTER_ERROR.category);

      return [];
    }
    setError(FILTER_ERROR.common);

    return [];
  }

  function getFilteredCardsBySearch(dataCards: ICard[], searchValue: string) {
    if (searchValue === '') {
      return dataCards;
    }

    const result = dataCards.filter((card) => card.title.toLowerCase().search(searchValue.toLowerCase()) !== -1);

    if (!result.length) {
      setError(FILTER_ERROR.common);
    }

    return result;
  }

  return (
    <div className={styles.main_page}>
      {cards.length > 0 && categories.length > 0 && (
        <React.Fragment>
          <div className={styles.main_page__filters}>
            <Filters handleViewChange={handleViewOnChange} />
          </div>
          {filteredCards.length > 0 && (
            <div className={styles.main_page__cards}>
              <Cards dataCards={filteredCards} viewType={viewCardsType} />
            </div>
          )}
          {!filteredCards.length && error && error === FILTER_ERROR.category && (
            <div className={styles.main_page__error} data-test-id='empty-category'>
              {error}
            </div>
          )}
          {!filteredCards.length && error && error === FILTER_ERROR.common && (
            <div className={styles.main_page__error} data-test-id='search-result-not-found'>
              {error}
            </div>
          )}
        </React.Fragment>
      )}
      {(categoriesStatus === REQUEST_STATUS.pending || cardsStatus === REQUEST_STATUS.pending) && <Preloader />}
      <span data-test-id='error'>
        <ToastContainer {...TOAST_SETTINGS} />
      </span>
    </div>
  );
};
