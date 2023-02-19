import React from 'react';
import cn from 'classnames';

import styles from './book-title.module.css';

export const BookTitle = (props: {
  dropdown?: boolean;
  stylesInherit?: boolean;
  close?: boolean;
  children: React.ReactNode;
  handleDropdownOnClick?: () => void;
}) => {
  const handleOnClick = () => {
    if (props.handleDropdownOnClick) {
      props?.handleDropdownOnClick();
    }
  };

  return (
    <React.Fragment>
      {!props.dropdown && (
        <h3 className={cn(styles.title, props.stylesInherit && styles.styles_Inherit, props.close && styles.close)}>
          {props.children}
        </h3>
      )}
      {props.dropdown && (
        <div
          className={cn(
            styles.dropdown_btn__box,
            props.stylesInherit && styles.styles_Inherit,
            props.close && styles.close
          )}
        >
          <button
            className={cn(styles.dropdown_btn, props.close && styles.close)}
            type='button'
            onClick={handleOnClick}
            data-test-id='button-hide-reviews'
          >
            {props.children}
          </button>
        </div>
      )}
    </React.Fragment>
  );
};
