/* eslint-disable import/no-default-export */
import React, { HTMLInputTypeAttribute, memo, useState } from 'react';
import cn from 'classnames';

import passwHideIcon from '../../assets/img/passw-hide-icon.svg';
import passwValidIcon from '../../assets/img/passw-valid-icon.svg';
import passwVisible from '../../assets/img/passw-visible-icon.svg';
import { Error } from '../error/error';
import { ValidationMessage } from '../validation-message/validation-message';

import styles from './input-field.module.css';

interface IInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validationMessage?: string;
  error?: string;
  focusValue?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderCustom?: string;
  inputValue?: string;
  invalid?: boolean;
  validIcon?: boolean;
  errorStaticPos?: boolean;
}

const InputField = React.forwardRef<HTMLInputElement, IInputFieldProps>((props, ref) => {
  const {
    validationMessage = '',
    error = '',
    handleChange,
    focusValue = false,
    onBlur,
    placeholderCustom,
    inputValue,
    invalid,
    validIcon,
    errorStaticPos = false,
    type,
    ...inputProps
  } = props;
  const [focus, setFocus] = useState(focusValue);
  const [passwVisibility, setPasswVisibility] = useState(false);

  const handleInputOnFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocus(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  const handlePasswBtnClick = () => {
    setPasswVisibility(!passwVisibility);
  };

  const getInputType = (inputType: HTMLInputTypeAttribute) => {
    if (inputType === 'password') {
      return passwVisibility ? 'text' : 'password';
    }

    return inputType;
  };

  return (
    <div className={cn(styles.input__wrapper, (error || invalid) && styles.invalid)}>
      <div className={cn(styles.input__box, (error || invalid) && styles.invalid)}>
        <input
          ref={ref}
          onChange={handleChange}
          className={cn(styles.input, inputValue && styles.not_empty)}
          type={type && getInputType(type)}
          {...inputProps}
          onBlur={handleOnBlur}
          onFocus={handleInputOnFocus}
        />
        {placeholderCustom && <span className={styles.input__placeholder}>{placeholderCustom}</span>}
        {type === 'password' && (
          <React.Fragment>
            {inputValue && !error && validIcon && (
              <img data-test-id='checkmark' className={styles.input__passw__valid_icon} src={passwValidIcon} alt='' />
            )}
            <button className={styles.input__passw_btn} type='button' onClick={handlePasswBtnClick}>
              <img
                data-test-id='eye-opened'
                className={cn(styles.input__passw_icon, passwVisibility && styles.active)}
                src={passwVisible}
                alt=''
              />
              <img
                data-test-id='eye-closed'
                className={cn(styles.input__passw_icon, !passwVisibility && styles.active)}
                src={passwHideIcon}
                alt=''
              />
            </button>
          </React.Fragment>
        )}
      </div>
      {validationMessage && (
        <ValidationMessage error={error} text={validationMessage} focusValue={focus} errorStaticPos={errorStaticPos} />
      )}
      {!validationMessage && error && <Error errorStaticPos={errorStaticPos}>{error}</Error>}
    </div>
  );
});

export default memo(InputField);
