import { RatingView } from '../../../components/rating/rating-view';
import { IReviewEl } from '../../../types/custom-types';

import styles from './review-el.module.css';

export const ReviewEl = (data: IReviewEl) => (
  <li className={styles.review_el}>
    <div className={styles.review_el__info}>
      <span className={styles.review_el__img_box}>
        <img className={styles.review_el__img} src={data.icon} alt='' />
      </span>
      <span className={styles.review_el__info_right}>
        <span className={styles.review_el__name}>{data.name}</span>
        <span className={styles.review_el__date}>{data.date}</span>
      </span>
    </div>
    <div className={styles.review_el__rating}>
      <RatingView count={data.rating} />
    </div>
    {data.text && <p className={styles.review_el__text}>{data.text}</p>}
  </li>
);
