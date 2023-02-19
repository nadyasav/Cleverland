import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { BaseBtn } from '../../components/base-btn/base-btn';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs';
import dataCategories from '../../components/nav-menu/data-categories.json';
import { RatingView } from '../../components/rating/rating-view';
import { ROUTES } from '../../constants';
import { dataCards } from '../main/data-cards';

import { BookDetail } from './book-detail/book-detail';
import { BookInfoList } from './book-info-list/book-info-list';
import { BookTitle } from './book-title/book-title';
import { ReviewEl } from './review-el/review-el';

import styles from './book-page.module.css';

export const BookPage = () => {
  const { category, bookId } = useParams();
  const categoryName = dataCategories.find((item) => item.category === category);
  const book = dataCards.find((item) => String(item.id) === bookId);
  const [dropdownCommentsState, setDropdownCommentsState] = useState(!book?.reviews.length);
  const handleDropdownOnClick = () => {
    setDropdownCommentsState(!dropdownCommentsState);
  };
  const breadcrumbs = [
    {
      id: 1,
      path: category || '',
      name: categoryName?.title || 'Все книги',
    },
    {
      id: 2,
      path: bookId || '',
      name: book?.title || '',
    },
  ];

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
                  <RatingView count={book.rating} />
                </div>
                {book.rating > 0 && <BookTitle close={true}>{book.rating}</BookTitle>}
                {book.rating <= 0 && <p className={styles.book_page__rating_text}>ещё нет оценок</p>}
              </div>
            </div>
            <div className={styles.book_page__info_box}>
              <div className={styles.book_page__title_box}>
                <BookTitle>Подробная информация</BookTitle>
              </div>
              <div className={styles.book_page__info}>
                <div className={styles.book_page__info_list}>
                  <BookInfoList infoArr={book.info.slice(0, 5)} />
                </div>
                <div className={styles.book_page__info_list}>
                  <BookInfoList infoArr={book.info.slice(5)} />
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
                  Отзывы <span>{book.reviews.length}</span>
                </BookTitle>
              </div>
              {book.reviews.length > 0 && (
                <div className={cn(styles.book_page__reviews, dropdownCommentsState && styles.hidden)}>
                  <ul>
                    {book.reviews.map((item) => (
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
    </section>
  );
};
