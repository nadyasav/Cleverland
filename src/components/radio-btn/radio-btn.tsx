import React from 'react';

import styles from './radio-btn.module.css';

interface IRadioBtn extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange?: (value: string) => void;
  iconUrl: string;
  testId?: string;
}

export const RadioBtn = React.forwardRef<HTMLInputElement, IRadioBtn>((props, ref) => {
  const { handleChange, iconUrl, testId, ...inputProps } = props;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleChange) {
      handleChange(e.target.value);
    }
  };

  return (
    <label className={styles.input__label} data-test-id={testId ?? testId}>
      <input
        ref={ref}
        onChange={handleOnChange}
        className={styles.input}
        type="radio"
        {...inputProps}
      />
       <div className={styles.input__icon_box}>
          <img className={styles.input__icon} src={iconUrl} alt="" />
       </div>
    </label>
  )
});
