import cn from 'classnames';

import { IBaseBtnProps } from '../../types/custom-types';

import styles from './base-btn.module.css';

export const BaseBtn = (props: IBaseBtnProps) => {
  const { btnRef, children, stylesInherit = false, booked = false, ...btnProps } = props;

  return (
    <button
      type='button'
      className={cn(styles.button, stylesInherit && styles.styles_Inherit, booked && styles.booked)}
      ref={btnRef}
      {...btnProps}
    >
      {children}
    </button>
  );
};
