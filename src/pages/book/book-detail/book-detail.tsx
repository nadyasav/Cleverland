import cn from 'classnames';

import stubIcon from '../../../assets/img/stubIcon.svg';
import { BaseBtn } from '../../../components/base-btn/base-btn';
import { IDataCard } from '../../../types/custom-types';
import { BookTitle } from '../book-title/book-title';

import { BookDescription } from './book-description/book-description';
import { BookSlider } from './book-slider/book-slider';

import styles from './book-detail.module.css';

export const BookDetail = (props: IDataCard) => (
  <div className={styles.book}>
    <div className={styles.book__inner}>
      <div className={styles.book__img_container}>
        {props.imgBookPage.length > 1 && <BookSlider imgArr={props.imgBookPage} />}
        {props.imgBookPage.length <= 1 && (
          <div className={cn(styles.book__img_box, !props.imgBookPage.length && styles.card__icon_box)}>
            <img
              className={styles.book__img}
              alt={props?.title}
              src={props.imgBookPage[0] ? props.imgBookPage[0].img : stubIcon}
            />
          </div>
        )}
      </div>
      <div className={styles.book__info}>
        <h2 className={styles.book__title}>{props?.title}</h2>
        <p className={styles.book__author}>
          <span>{props?.author}</span>, <span>{props?.date}</span>
        </p>
        <div className={styles.book__btn}>
          <BaseBtn stylesInherit={true} disabled={!!props.busy} booked={props.booked}>
            {props.busy && `занята до ${props.busy}`}
            {props.booked && 'Забронирована'}
            {!props.busy && !props.booked && 'Забронировать'}
          </BaseBtn>
        </div>
        <div className={styles.book__description}>
          <div className={styles.book__description_title}>
            <BookTitle>О книге</BookTitle>
          </div>
          <div className={styles.book__description_text}>
            <BookDescription description={props?.description} />
          </div>
        </div>
      </div>
    </div>
    <div className={styles.book__description_tablet}>
      <BookTitle>О книге</BookTitle>
      <div className={styles.book__description_text}>
        <BookDescription description={props?.description} />
      </div>
    </div>
  </div>
);
