import cn from 'classnames';

import { ICard } from '../../../types/custom-types';

import { Card } from './card/card';

import styles from './cards.module.css';

export const Cards = (props: { dataCards: ICard[]; viewType: string }) => (
  <div className={cn(styles.cards, styles[props.viewType])}>
    {props.dataCards.map((item) => (
      <Card key={item.id} dataCard={item} viewType={props.viewType} />
    ))}
  </div>
);
