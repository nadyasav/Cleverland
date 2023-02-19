import React from 'react';

import styles from './book-description.module.css';

export const BookDescription = (props: { description: Array< { id: string, paragraph: string } > }) => (
  <React.Fragment>
    {props.description.map(
      (item) =>
        <p className={styles.book_description__item} key={item.id}>{item.paragraph}</p>
    )}
  </React.Fragment>
);