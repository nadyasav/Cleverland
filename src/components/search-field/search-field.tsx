/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import cn from 'classnames';

import loupeIcon from '../../assets/img/loupe.svg';
import loupeIconFocus from '../../assets/img/loupe-focus.svg';

import styles from './search-field.module.css';

interface ISearchField extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  closeSearchField: () => void;
  openOnMobile: boolean;
}

export const SearchField = React.forwardRef<HTMLInputElement, ISearchField>((props, ref) => {
  const { handleChange, closeSearchField, openOnMobile, ...inputProps } = props;

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeSearchField();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      handleChange(e);
    }
  };

  return (
    <label className={cn(styles.input__box, openOnMobile && styles.open)}>
      <input
        ref={ref}
        onChange={handleOnChange}
        className={styles.input}
        type='text'
        {...inputProps}
        data-test-id='input-search'
      />
      <img className={styles.input__icon_loupe} src={loupeIcon} alt='' />
      <img className={styles.input__icon_loupe_focus} src={loupeIconFocus} alt='' />
      <button
        type='button'
        className={styles.input__remove_btn}
        aria-label='close'
        onMouseDown={handleCloseClick}
        data-test-id='button-search-close'
      />
    </label>
  );
});
