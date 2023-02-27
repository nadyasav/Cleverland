import { SORT_TYPE } from '../constants';
import { ICard } from '../types/custom-types';

export function getSortedCards(cardsArr: ICard[], type: string) {
  if (type === SORT_TYPE.asc) {
    return [...cardsArr].sort((a, b) => (a.rating === null ? 0 : a.rating) - (b.rating === null ? 0 : b.rating));
  }

  return [...cardsArr].sort((a, b) => (b.rating === null ? 0 : b.rating) - (a.rating === null ? 0 : a.rating));
}
