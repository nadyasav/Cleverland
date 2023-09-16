import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { FormEl } from '../../components/form-el/form-el';
import { FormMessageEl } from '../../components/form-message-el/form-message-el';
import InputField from '../../components/input-field/input-field';
import { Preloader } from '../../components/preloader/preloader';
import { REQUEST_STATUS, ROUTES, VALIDATION_MESSAGE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { resetAuthorization, resetPass } from '../../store/authorization-slice';
import { IFormMessageEl, IResetPassDataForm } from '../../types/custom-types';
import { checkInputValidation } from '../../utils/check-input-validation';

import styles from './reset-pass.module.css';

export const ResetPass = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageElState, setMessageElState] = useState(false);
  const { authStatus, authMessage, urlToken } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IResetPassDataForm>({
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
    mode: 'all',
  });

  const [dataMessageEl, setdataMessageEl] = useState<IFormMessageEl>({
    title: '',
    message: '',
    button: {
      title: '',
      handleBtnClick: () => {},
    },
  });

  const handleLogin = useCallback(() => {
    navigate(ROUTES.auth);
  }, [navigate]);

  useEffect(
    () => () => {
      dispatch(resetAuthorization());
    },
    [dispatch]
  );
  const handleRepeat = useCallback(() => {
    dispatch(resetPass({ ...getValues(), code: urlToken }));
  }, [dispatch, getValues, urlToken]);

  useEffect(() => {
    if (authStatus === REQUEST_STATUS.fulfilled) {
      setdataMessageEl({
        title: 'Новые данные сохранены',
        message: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
        button: {
          title: 'вход',
          handleBtnClick: handleLogin,
        },
      });
      setMessageElState(true);
    } else if (authStatus === REQUEST_STATUS.rejected) {
      setdataMessageEl({
        title: 'Данные не сохранились',
        message: authMessage.error,
        button: {
          title: 'повторить',
          handleBtnClick: handleRepeat,
        },
      });
      setMessageElState(true);
    }
  }, [authMessage.error, authStatus, handleLogin, handleRepeat]);

  const handleFormSubmit: SubmitHandler<IResetPassDataForm> = (data) => {
    if (urlToken) {
      dispatch(resetPass({ ...data, code: urlToken }));
    }
  };

  const getvalidationMessage = (inputName: string, messageDefault: string) => {
    const errorMessage = errors[inputName as keyof IResetPassDataForm]?.message;

    return errorMessage && !getValues(inputName as keyof IResetPassDataForm) ? errorMessage : messageDefault;
  };

  return (
    <React.Fragment>
      {!messageElState && (
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} data-test-id='reset-password-form'>
          <div className={styles.form__inner}>
            <FormEl
              title='Восстановление пароля'
              btnText='сохранить изменения'
              btnDisabled={!!Object.keys(errors).length}
              text='После сохранения войдите в библиотеку, используя новый пароль'
            >
              <React.Fragment>
                <div className={styles.input__box}>
                  <InputField
                    {...register('password', {
                      required: VALIDATION_MESSAGE.empty,
                      validate: (value) => checkInputValidation('password', value),
                    })}
                    validationMessage={getvalidationMessage('password', VALIDATION_MESSAGE.passwCommon)}
                    error={errors.password?.message}
                    inputValue={getValues('password')}
                    validIcon={true}
                    placeholderCustom='Пароль'
                    name='password'
                    type='password'
                  />
                </div>
                <div className={styles.input__box}>
                  <InputField
                    {...register('passwordConfirmation', {
                      required: VALIDATION_MESSAGE.empty,
                      validate: (value) =>
                        value === getValues('password') ? true : VALIDATION_MESSAGE.recoverPassError,
                    })}
                    error={errors.passwordConfirmation?.message}
                    inputValue={getValues('passwordConfirmation')}
                    validIcon={false}
                    placeholderCustom='Пароль'
                    name='passwordConfirmation'
                    type='password'
                  />
                </div>
              </React.Fragment>
            </FormEl>
          </div>
        </form>
      )}
      {messageElState && (
        <FormMessageEl title={dataMessageEl.title} message={dataMessageEl.message} button={dataMessageEl.button} />
      )}
      {authStatus === REQUEST_STATUS.pending && <Preloader />}
    </React.Fragment>
  );
};
