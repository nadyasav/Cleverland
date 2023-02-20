import styles from './book-description.module.css';

export const BookDescription = (props: { description: string }) => (
  <p className={styles.book_description__item}>{props.description}</p>
);
