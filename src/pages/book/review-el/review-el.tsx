import stubIcon from '../../../assets/img/stubIcon.svg';
import { RatingView } from '../../../components/rating/rating-view';
import { IComment } from '../../../types/custom-types';
import { formatDate } from '../../../utils/format-date';

import styles from './review-el.module.css';

export const ReviewEl = (data: IComment) => (
  <li className={styles.review_el}>
    <div className={styles.review_el__info}>
      <span className={styles.review_el__img_box}>
        <img className={styles.review_el__img} src={data.user?.avatarUrl ? data.user?.avatarUrl : stubIcon} alt='' />
      </span>
      <span className={styles.review_el__info_right}>
        <span className={styles.review_el__name}>
          {data.user?.firstName} {data.user?.lastName}
        </span>
        <span className={styles.review_el__date}>{formatDate(data.createdAt)}</span>
      </span>
    </div>
    <div className={styles.review_el__rating}>
      <RatingView count={data.rating} />
    </div>
    {data.text && <p className={styles.review_el__text}>{data.text}</p>}
  </li>
);
