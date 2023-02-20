import styles from './book-info-list.module.css';

export const BookInfoList = (props: { infoArr: Array<{ id: string; key: string; value: string | string[] }> }) => (
  <ul className={styles.info_list}>
    {props.infoArr.map((item) => (
      <li className={styles.info_list__item} key={item.id}>
        <span className={styles.info_list__key}>{item.key}</span>
        <span className={styles.info_list__value}>{item.value}</span>
      </li>
    ))}
  </ul>
);
