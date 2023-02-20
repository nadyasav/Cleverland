import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';

import stubIcon from '../../../../assets/img/stubIcon.svg';
import { BaseBtn } from '../../../../components/base-btn/base-btn';
import { RatingView } from '../../../../components/rating/rating-view';
import { ROUTES } from '../../../../constants';
import { ICard } from '../../../../types/custom-types';
import { formatDate } from '../../../../utils/format-date';

import styles from './card.module.css';

export const Card = (props: { dataCard: ICard; viewType: string }) => {
  const { category } = useParams();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const authorRef = useRef<HTMLParagraphElement>(null);
  const [titleState, setTitleState] = useState(false);
  const [authorState, setAuthorState] = useState(false);

  const checkOverflow = useCallback(
    (elRef: RefObject<HTMLElement>, setOverflowState: Dispatch<SetStateAction<boolean>>) => {
      const currRef = elRef.current;

      if (currRef?.parentElement) {
        if (currRef.parentElement.clientHeight < currRef.clientHeight) {
          setOverflowState(true);
        }
      }
    },
    []
  );

  useEffect(() => {
    checkOverflow(titleRef, setTitleState);
    checkOverflow(authorRef, setAuthorState);
  }, [checkOverflow]);

  return (
    <Link
      to={`${ROUTES.books}/${category}/${props.dataCard.id}`}
      className={cn(styles.card, styles[props.viewType])}
      data-test-id='card'
    >
      <div className={cn(styles.card__img_box, !props.dataCard.image?.url && styles.card__icon_box)}>
        <img
          className={styles.card__img}
          src={props.dataCard.image?.url ? `https://strapi.cleverland.by${props.dataCard.image?.url}` : stubIcon}
          alt={props.dataCard.title}
        />
      </div>
      <div className={styles.card__info}>
        <div className={styles.card__rating}>
          {!props.dataCard.rating && <p>ещё нет оценок</p>}
          {props.dataCard.rating && (
            <div className={styles.card__rating_stars}>
              <RatingView count={props.dataCard.rating} />
            </div>
          )}
        </div>
        <div className={styles.card__description}>
          <div className={styles.card__description_text}>
            <div className={cn(styles.card__title_box, titleState && styles.overflow)}>
              <h3 className={styles.card__title} ref={titleRef}>
                {props.dataCard.title}
              </h3>
              {titleState && <span className={styles.card__dots}>...</span>}
            </div>
            <div className={cn(styles.card__author_box, authorState && styles.overflow)}>
              <p className={styles.card__author} ref={authorRef}>
                {props.dataCard.authors &&
                  props.dataCard.authors.length > 0 &&
                  props.dataCard.authors.reduce((item, value) => `${item}, ${value}`)}
                <span className={styles.card__date}>
                  {props.dataCard.issueYear ? `, ${props.dataCard.issueYear}` : ''}
                </span>
              </p>
              {authorState && <span className={styles.card__dots}>...</span>}
            </div>
          </div>
          <div className={styles.card__bottom}>
            <div className={styles.card__bottom__rating}>
              {!props.dataCard.rating && <p>ещё нет оценок</p>}
              {props.dataCard.rating && (
                <div className={styles.card__rating_stars}>
                  <RatingView count={props.dataCard.rating} />
                </div>
              )}
            </div>
            <div className={styles.card__btn_box}>
              <BaseBtn disabled={!!props.dataCard.delivery?.handed} booked={props.dataCard.booking?.order}>
                {props.dataCard.delivery?.handed &&
                  `занята до ${
                    props.dataCard.delivery?.dateHandedTo
                      ? formatDate(props.dataCard.delivery?.dateHandedTo, false)
                      : ''
                  }`}
                {props.dataCard.booking?.order && 'Забронирована'}
                {!props.dataCard.delivery?.handed && !props.dataCard.booking?.order && 'Забронировать'}
              </BaseBtn>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
