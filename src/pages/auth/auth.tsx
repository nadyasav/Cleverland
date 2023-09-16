import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import linkArrowIcon from '../../assets/img/link-arrow.svg';
import { FormEl } from '../../components/form-el/form-el';
import { FormMessageEl } from '../../components/form-message-el/form-message-el';
import InputField from '../../components/input-field/input-field';
import { Preloader } from '../../components/preloader/preloader';
import { REQUEST_STATUS, ROUTES, VALIDATION_MESSAGE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { resetAuthorization, setUser } from '../../store/authorization-slice';
import { IAuthData } from '../../types/custom-types';

import styles from './auth.module.css';

export const Auth = () => {
  const dispatch = useAppDispatch();
  const [messageElState, setMessageElState] = useState(false);
  const { authStatus, authMessage } = useAppSelector((state) => state.user);
  const [invalid, setTnvalid] = useState(false);
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<IAuthData>({
    defaultValues: {
      identifier: '',
      password: '',
    },
    mode: 'all',
  });

  useEffect(
    () => () => {
      dispatch(resetAuthorization());
    },
    [dispatch]
  );

  useEffect(() => {
    if (authStatus === REQUEST_STATUS.fulfilled) {
      setTnvalid(false);
      setMessageElState(false);
    } else if (authStatus === REQUEST_STATUS.rejected) {
      if (authMessage.code === '400') {
        setMessageElState(false);
        setTnvalid(true);
      } else {
        setMessageElState(true);
      }
    }
  }, [authStatus, authMessage, trigger]);

  const handleFormSubmit: SubmitHandler<IAuthData> = (data) => {
    dispatch(setUser(data));
  };

  const handleRepeat = useCallback(() => {
    dispatch(setUser(getValues()));
  }, [dispatch, getValues]);

  return (
    <React.Fragment>
      {!messageElState && (
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} data-test-id='auth-form'>
          <FormEl
            title='Вход в личный кабинет'
            btnText='вход'
            btnDisabled={!!Object.keys(errors).length}
            text='Нет учётной записи?'
            link={{
              title: 'Регистрация',
              path: ROUTES.registration,
              linkArrowIcon,
            }}
          >
            <React.Fragment>
              <div className={styles.input__box}>
                <InputField
                  {...register('identifier', {
                    required: VALIDATION_MESSAGE.empty,
                  })}
                  error={errors.identifier?.message}
                  inputValue={getValues('identifier')}
                  placeholderCustom='Логин'
                  invalid={invalid}
                  name='identifier'
                  type='text'
                />
              </div>
              <div className={styles.input__box}>
                <InputField
                  {...register('password', {
                    required: VALIDATION_MESSAGE.empty,
                  })}
                  error={errors.password?.message}
                  inputValue={getValues('password')}
                  placeholderCustom='Пароль'
                  invalid={invalid}
                  validIcon={false}
                  name='password'
                  type='password'
                />
              </div>
              {invalid && (
                <div className={styles.auth_error__box}>
                  <p className={styles.auth_error}>{authMessage.error}</p>
                  <NavLink className={styles.auth_error__link} to={ROUTES.forgotPass}>
                    Восстановить?
                  </NavLink>
                </div>
              )}
              {!invalid && (
                <div className={styles.auth__fogot_link__box}>
                  <NavLink className={styles.auth__fogot_link} to={ROUTES.forgotPass}>
                    Забыли логин или пароль?
                  </NavLink>
                </div>
              )}
            </React.Fragment>
          </FormEl>
        </form>
      )}
      {messageElState && (
        <FormMessageEl
          title='Вход не выполнен'
          message={authMessage.error}
          button={{ title: 'повторить', handleBtnClick: handleRepeat }}
        />
      )}
      {authStatus === REQUEST_STATUS.pending && <Preloader />}
    </React.Fragment>
  );
};
