import cn from 'classnames';

import stubIcon from '../../../assets/img/stubIcon.svg';
import { BaseBtn } from '../../../components/base-btn/base-btn';
import { IBook } from '../../../types/custom-types';
import { formatDate } from '../../../utils/format-date';
import { BookTitle } from '../book-title/book-title';

import { BookDescription } from './book-description/book-description';
import { BookSlider } from './book-slider/book-slider';

import styles from './book-detail.module.css';

export const BookDetail = (props: IBook) => (
  <div className={styles.book}>
    <div className={styles.book__inner}>
      <div className={styles.book__img_container}>
        {props.images && props.images?.length > 1 ? (
          <BookSlider imgArr={props.images} />
        ) : (
          <div className={cn(styles.book__img_box, !props.images && styles.card__icon_box)}>
            <img
              className={styles.book__img}
              alt={props?.title}
              src={props.images && props.images[0] ? `https://strapi.cleverland.by${props.images[0].url}` : stubIcon}
            />
          </div>
        )}
      </div>
      <div className={styles.book__info}>
        <h2 className={styles.book__title}>{props?.title}</h2>
        <p className={styles.book__author}>
          <span>
            {props.authors && props.authors.length > 0 && props.authors.reduce((item, value) => `${item}, ${value}`)}
          </span>
          <span>{props?.issueYear ? `, ${props.issueYear}` : ''}</span>
        </p>
        <div className={styles.book__btn}>
          <BaseBtn stylesInherit={true} disabled={!!props.delivery?.handed} booked={props.booking?.order}>
            {props.delivery?.handed &&
              `занята до ${props.delivery?.dateHandedTo ? formatDate(props.delivery?.dateHandedTo, false) : ''}`}
            {props.booking?.order && 'Забронирована'}
            {!props.delivery?.handed && !props.booking?.order && 'Забронировать'}
          </BaseBtn>
        </div>
        <div className={styles.book__description}>
          <div className={styles.book__description_title}>
            <BookTitle>О книге</BookTitle>
          </div>
          <div className={styles.book__description_text}>
            <BookDescription description={props?.description ? props.description : ''} />
          </div>
        </div>
      </div>
    </div>
    <div className={styles.book__description_tablet}>
      <BookTitle>О книге</BookTitle>
      <div className={styles.book__description_text}>
        <BookDescription description={props?.description ? props.description : ''} />
      </div>
    </div>
  </div>
);
