import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useSearchParams } from 'react-router-dom';

import linkArrowIcon from '../../assets/img/link-arrow.svg';
import linkArrowLeft from '../../assets/img/link-arrow-left.svg';
import { FormEl } from '../../components/form-el/form-el';
import { FormMessageEl } from '../../components/form-message-el/form-message-el';
import InputField from '../../components/input-field/input-field';
import { Preloader } from '../../components/preloader/preloader';
import { REGEX, REQUEST_STATUS, ROUTES, VALIDATION_MESSAGE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { passRecovery, resetAuthorization, setUrlToken } from '../../store/authorization-slice';
import { IForgotPassData } from '../../types/custom-types';

import styles from './fogot-pass.module.css';

export const ForgotPass = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { authStatus, authMessage } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IForgotPassData>({
    defaultValues: {
      email: '',
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
    const token = searchParams.get('code');

    if (token) {
      dispatch(setUrlToken(token));
    }
  }, [dispatch, searchParams]);

  const handleFormSubmit: SubmitHandler<IForgotPassData> = (data) => {
    dispatch(passRecovery(data));
  };

  return (
    <React.Fragment>
      {authStatus !== REQUEST_STATUS.fulfilled && (
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} data-test-id='send-email-form'>
          <div className={styles.form__auth_link__box}>
            <img src={linkArrowLeft} alt='' className={styles.form__auth_link__icon} />
            <NavLink className={styles.form__auth_link} to={ROUTES.auth}>
              вход в личный кабинет
            </NavLink>
          </div>
          <div className={styles.form__inner}>
            <FormEl
              title='Восстановление пароля'
              btnText='восстановить'
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
                    {...register('email', {
                      required: VALIDATION_MESSAGE.empty,
                      validate: (value) => REGEX.email.test(value) || VALIDATION_MESSAGE.emailError,
                    })}
                    error={errors.email?.message || authMessage.error}
                    inputValue={getValues('email')}
                    placeholderCustom='Email'
                    errorStaticPos={true}
                    name='email'
                    type='email'
                  />
                </div>
                <p className={styles.input__subtitle}>
                  На это email будет отправлено письмо с инструкциями по восстановлению пароля
                </p>
              </React.Fragment>
            </FormEl>
          </div>
        </form>
      )}
      {authStatus === REQUEST_STATUS.fulfilled && (
        <FormMessageEl
          title='Письмо выслано'
          message='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
        />
      )}
      {authStatus === REQUEST_STATUS.pending && <Preloader />}
    </React.Fragment>
  );
};
