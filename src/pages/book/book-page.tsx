/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import cn from 'classnames';

import { BaseBtn } from '../../components/base-btn/base-btn';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import { Preloader } from '../../components/preloader/preloader';
import { RatingView } from '../../components/rating/rating-view';
import { REQUEST_ERRORS, REQUEST_STATUS, ROUTES, TOAST_SETTINGS } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchBook, setBook, setBookError } from '../../store/book-slice';
import { fetchCategories, setCategoriesError } from '../../store/categories-slice';

import { BookDetail } from './book-detail/book-detail';
import { BookInfoList } from './book-info-list/book-info-list';
import { BookTitle } from './book-title/book-title';
import { ReviewEl } from './review-el/review-el';

import styles from './book-page.module.css';

export const BookPage = () => {
  const { category, bookId } = useParams();
  const dispatch = useAppDispatch();
  const { categories, categoriesStatus, categoriesError } = useAppSelector((state) => state.categories);
  const [categoryName, setCategoryName] = useState('');
  const { book, bookStatus, bookError } = useAppSelector((state) => state.book);
  const [dropdownCommentsState, setDropdownCommentsState] = useState(!book?.comments?.length);
  const handleDropdownOnClick = () => {
    setDropdownCommentsState(!dropdownCommentsState);
  };
  const breadcrumbs = [
    {
      id: 1,
      path: category || '',
      name: categoryName || 'Все книги',
    },
    {
      id: 2,
      path: bookId || '',
      name: book?.title || '',
    },
  ];

  useEffect(
    () => () => {
      dispatch(setCategoriesError(''));
      dispatch(setBookError(''));
      dispatch(setBook(null));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    } else if (categories.length && !categoryName) {
      const catName = categories.find((item) => item.path === category);

      setCategoryName(catName ? catName.name : '');
    }
  }, [categories, category, categoryName, dispatch]);

  useEffect(() => {
    if (bookId) {
      dispatch(fetchBook(bookId));
    }
  }, [bookId, dispatch]);

  useEffect(() => {
    if (categoriesStatus !== REQUEST_STATUS.pending && bookStatus !== REQUEST_STATUS.pending) {
      if (categoriesError || bookError) {
        toast.error(REQUEST_ERRORS.common, { toastId: 'bookPageToast' });
      }
    }
  }, [categoriesError, bookError, categoriesStatus, bookStatus]);

  return (
    <section className={styles.book_page}>
      <Breadcrumbs baseUrl={ROUTES.books} items={breadcrumbs} />
      <div className={styles.book_page__wrapper}>
        {book && (
          <React.Fragment>
            <BookDetail {...book} />
            <div className={styles.book_page__rating_box}>
              <div className={styles.book_page__title_box}>
                <BookTitle>Рейтинг</BookTitle>
              </div>
              <div className={styles.book_page__rating}>
                <div className={styles.book_page__rating_stars}>
                  <RatingView count={book.rating ? book.rating : 0} />
                </div>
                {book.rating && book.rating > 0 && <BookTitle close={true}>{book.rating}</BookTitle>}
                {book.rating && book.rating <= 0 && <p className={styles.book_page__rating_text}>ещё нет оценок</p>}
              </div>
            </div>
            <div className={styles.book_page__info_box}>
              <div className={styles.book_page__title_box}>
                <BookTitle>Подробная информация</BookTitle>
              </div>
              <div className={styles.book_page__info}>
                <div className={styles.book_page__info_list}>
                  <BookInfoList
                    infoArr={[
                      { id: '1', key: 'Издательство', value: book.publish || '' },
                      { id: '2', key: 'Год издания', value: book.issueYear || '' },
                      { id: '3', key: 'Страниц', value: book.pages || '' },
                      { id: '4', key: 'Переплёт', value: book.cover || '' },
                      { id: '5', key: 'Формат', value: book.format || '' },
                    ]}
                  />
                </div>
                <div className={styles.book_page__info_list}>
                  <BookInfoList
                    infoArr={[
                      { id: '1', key: 'Жанр', value: book.categories || '' },
                      { id: '2', key: 'Вес', value: book.weight || '' },
                      { id: '3', key: 'ISBN', value: book.ISBN || '' },
                      { id: '4', key: 'Изготовитель', value: book.producer || '' },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className={styles.book_page__reviews_box}>
              <div className={styles.book_page__title_box}>
                <BookTitle
                  stylesInherit={true}
                  close={dropdownCommentsState}
                  dropdown={true}
                  handleDropdownOnClick={handleDropdownOnClick}
                >
                  Отзывы <span>{book.comments?.length || 0}</span>
                </BookTitle>
              </div>
              {book.comments && book.comments.length > 0 && (
                <div className={cn(styles.book_page__reviews, dropdownCommentsState && styles.hidden)}>
                  <ul>
                    {book.comments.map((item) => (
                      <ReviewEl {...item} key={item.id} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.book_page__btn}>
              <BaseBtn data-test-id='button-rating' stylesInherit={true}>
                оценить книгу
              </BaseBtn>
            </div>
          </React.Fragment>
        )}
      </div>
      {(categoriesStatus === REQUEST_STATUS.pending || bookStatus === REQUEST_STATUS.pending) && <Preloader />}
      <span data-test-id='error'>
        <ToastContainer {...TOAST_SETTINGS} />
      </span>
    </section>
  );
};
