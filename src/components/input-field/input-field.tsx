/* eslint-disable import/no-default-export */
import React, { memo, useState } from 'react';
import cn from 'classnames';

import { Error } from '../error/error';
import { ValidationMessage } from '../validation-message/validation-message';

import styles from './input-field.module.css';

interface IInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validationMessage?: string;
  error?: string;
  focusValue?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = React.forwardRef<HTMLInputElement, IInputFieldProps>((props, ref) => {
  const { validationMessage = '', error = '', handleChange, focusValue = false, onBlur, ...inputProps } = props;
  const [focus, setFocus] = useState(focusValue);

  const handleInputOnFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocus(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div className={styles.input__box}>
      <input
        ref={ref}
        onChange={handleChange}
        className={cn(styles.input, validationMessage && styles.invalid)}
        {...inputProps}
        onBlur={handleOnBlur}
        onFocus={handleInputOnFocus}
      />
      {validationMessage && <ValidationMessage error={error} text={validationMessage} focusValue={focus} />}
      {!validationMessage && error && <Error>{error}</Error>}
    </div>
  );
});

export default memo(InputField);
