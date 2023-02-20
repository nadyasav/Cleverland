import React, { useState } from 'react';

import styles from './sort-switcher.module.css';

interface ISortSwitcher extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: Array<{ iconUrl: string; title: string }>;
}

export const SortSwitcher = React.forwardRef<HTMLInputElement, ISortSwitcher>((props, ref) => {
  const { handleChange, data, ...inputProps } = props;
  const [sortState, setSortState] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      handleChange(e);
    }
    setSortState(e.currentTarget.checked);
  };

  return (
    <label className={styles.input__label}>
      <input className={styles.input} ref={ref} onChange={handleOnChange} type='checkbox' {...inputProps} />
      <img className={styles.input__icon_first} src={data[0].iconUrl} alt='' />
      <img className={styles.input__icon_second} src={data[1].iconUrl} alt='' />
      <span className={styles.input__title}>{sortState ? data[0].title : data[1].title}</span>
    </label>
  );
});
