import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import linkArrowIcon from '../../assets/img/link-arrow.svg';
import { FormEl } from '../../components/form-el/form-el';
import { FormMessageEl } from '../../components/form-message-el/form-message-el';
import InputField from '../../components/input-field/input-field';
import { Preloader } from '../../components/preloader/preloader';
import { REGEX, REQUEST_STATUS, ROUTES, VALIDATION_MESSAGE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { createUser, resetAuthorization } from '../../store/authorization-slice';
import { IFormMessageEl, IRegistrationData } from '../../types/custom-types';
import { checkInputValidation } from '../../utils/check-input-validation';

import styles from './registration.module.css';

export const Registration = () => {
  const stepCount = 3;
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const [messageElState, setMessageElState] = useState(false);
  const navigate = useNavigate();
  const { authStatus, authMessage } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IRegistrationData>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
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

  useEffect(
    () => () => {
      dispatch(resetAuthorization());
    },
    [dispatch]
  );

  const handleLogin = useCallback(() => {
    navigate(ROUTES.auth);
  }, [navigate]);

  const handleBack = useCallback(() => {
    reset({
      email: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    });
    setStep(1);
    setMessageElState(false);
  }, [reset]);

  const handleRepeat = useCallback(() => {
    dispatch(createUser(getValues()));
  }, [dispatch, getValues]);

  useEffect(() => {
    if (authStatus === REQUEST_STATUS.fulfilled) {
      setdataMessageEl({
        title: 'Регистрация успешна',
        message: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
        button: {
          title: 'вход',
          handleBtnClick: handleLogin,
        },
      });
      setMessageElState(true);
    } else if (authStatus === REQUEST_STATUS.rejected) {
      if (authMessage.code === '400') {
        setdataMessageEl({
          title: 'Данные не сохранились',
          message: authMessage.error,
          button: {
            title: 'назад к регистрации',
            handleBtnClick: handleBack,
          },
        });
        setMessageElState(true);
      } else {
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
    }
  }, [authStatus, authMessage, handleLogin, handleBack, handleRepeat]);

  const handleFormSubmit: SubmitHandler<IRegistrationData> = (data) => {
    dispatch(createUser(data));
  };

  const getvalidationMessage = (inputName: string, messageDefault: string) => {
    const errorMessage = errors[inputName as keyof IRegistrationData]?.message;

    return errorMessage && !getValues(inputName as keyof IRegistrationData) ? errorMessage : messageDefault;
  };

  const handleNextBtnClick = async (stepCurrent: number) => {
    switch (stepCurrent) {
      case 1:
        {
          const result = await trigger(['username', 'password']);

          if (result) {
            setStep(step + 1);
          }
        }
        break;

      case 2:
        {
          const result = await trigger(['firstName', 'lastName']);

          if (result) {
            setStep(step + 1);
          }
        }
        break;
    }
  };

  const getBtnTitle = () => {
    if (step < stepCount - 1) {
      return 'следующий шаг';
    }
    if (step === stepCount - 1) {
      return 'последний шаг';
    }

    return 'зарегистрироваться';
  };

  return (
    <React.Fragment>
      {!messageElState && (
        <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)} data-test-id='register-form'>
          <FormEl
            title='Регистрация'
            btnText={getBtnTitle()}
            btnDisabled={!!Object.keys(errors).length}
            text='Есть учётная запись?'
            steps={{
              stepCount,
              stepCurrent: step,
              handleBtnClick: handleNextBtnClick,
            }}
            link={{
              title: 'войти',
              path: ROUTES.auth,
              linkArrowIcon,
            }}
          >
            {step === 1 && (
              <React.Fragment>
                <div className={styles.input__box}>
                  <InputField
                    {...register('username', {
                      required: VALIDATION_MESSAGE.empty,
                      validate: (value) => checkInputValidation('login', value),
                    })}
                    validationMessage={getvalidationMessage('login', VALIDATION_MESSAGE.loginCommon)}
                    error={errors.username?.message}
                    inputValue={getValues('username')}
                    placeholderCustom='Придумайте логин для входа'
                    name='username'
                    type='text'
                  />
                </div>
                <div className={styles.input__box}>
                  <InputField
                    {...register('password', {
                      required: VALIDATION_MESSAGE.empty,
                      validate: (value) => checkInputValidation('password', value),
                    })}
                    validationMessage={getvalidationMessage('password', VALIDATION_MESSAGE.passwCommon)}
                    error={errors.password?.message}
                    inputValue={getValues('password')}
                    placeholderCustom='Пароль'
                    name='password'
                    type='password'
                  />
                </div>
              </React.Fragment>
            )}
            {step === 2 && (
              <React.Fragment>
                <div className={styles.input__box}>
                  <InputField
                    {...register('firstName', {
                      required: VALIDATION_MESSAGE.empty,
                    })}
                    error={errors.firstName?.message}
                    inputValue={getValues('firstName')}
                    placeholderCustom='Имя'
                    name='firstName'
                    type='text'
                  />
                </div>
                <div className={styles.input__box}>
                  <InputField
                    {...register('lastName', {
                      required: VALIDATION_MESSAGE.empty,
                    })}
                    error={errors.lastName?.message}
                    inputValue={getValues('lastName')}
                    placeholderCustom='Фамилия'
                    name='lastName'
                    type='text'
                  />
                </div>
              </React.Fragment>
            )}
            {step === 3 && (
              <React.Fragment>
                <div className={styles.input__box}>
                  <InputField
                    {...register('phone', {
                      required: VALIDATION_MESSAGE.empty,
                    })}
                    validationMessage={getvalidationMessage('phone', VALIDATION_MESSAGE.phoneError)}
                    error={errors.phone?.message}
                    inputValue={getValues('phone')}
                    placeholderCustom='Номер телефона'
                    name='phone'
                    type='tel'
                  />
                </div>
                <div className={styles.input__box}>
                  <InputField
                    {...register('email', {
                      required: VALIDATION_MESSAGE.empty,
                      validate: (value) => REGEX.email.test(value) || VALIDATION_MESSAGE.emailError,
                    })}
                    error={errors.email?.message}
                    inputValue={getValues('email')}
                    placeholderCustom='E-mail'
                    name='email'
                    type='email'
                  />
                </div>
              </React.Fragment>
            )}
          </FormEl>
        </form>
      )}
      {messageElState && (
        <FormMessageEl title={dataMessageEl.title} message={dataMessageEl.message} button={dataMessageEl.button} />
      )}
      {authStatus === REQUEST_STATUS.pending && <Preloader />}
    </React.Fragment>
  );
};
