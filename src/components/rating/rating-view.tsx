import starIcon from '../../assets/img/star.svg';
import starActiveIcon from '../../assets/img/star-active.svg';

import styles from './rating-view.module.css';

export const RatingView = (props: { count: number}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
  <div className={styles.rating__stars}>
    {stars.map((item) =>
      <span className={styles.rating__star} key={`star ${item}`}>
        <img src={item <= props.count ? starActiveIcon : starIcon} className={styles.rating__star_img} alt=""/>
      </span>
    )}
  </div>
)};
