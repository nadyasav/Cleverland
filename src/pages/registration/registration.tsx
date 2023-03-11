import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FormEl } from '../../components/form-el/form-el';
import InputField from '../../components/input-field/input-field';
import { Preloader } from '../../components/preloader/preloader';
import { REGEX, REQUEST_STATUS, ROUTES, VALIDATION_MESSAGE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { checkInputValidation } from '../../utils/check-input-validation';

import styles from './registration.module.css';

interface IRegistrationData {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export const Registration = () => {
  const stepCount = 3;
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(1);
  const { authStatus } = useAppSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<IRegistrationData>({
    defaultValues: {
      login: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    mode: 'all',
  });

  const handleFormSubmit: SubmitHandler<IRegistrationData> = (data) => {
    console.log(data);
  };

  const getvalidationMessage = (inputName: string, messageDefault: string) => {
    const errorMessage = errors[inputName as keyof IRegistrationData]?.message;

    return errorMessage && !getValues(inputName as keyof IRegistrationData) ? errorMessage : messageDefault;
  };

  const handleNextBtnClick = async (stepCurrent: number) => {
    switch (stepCurrent) {
      case 1:
        {
          const result = await trigger(['login', 'password']);

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
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
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
          }}
        >
          {step === 1 && (
            <React.Fragment>
              <div className={styles.input__box}>
                <InputField
                  {...register('login', {
                    required: VALIDATION_MESSAGE.empty,
                    validate: (value) => checkInputValidation('login', value),
                  })}
                  validationMessage={getvalidationMessage('login', VALIDATION_MESSAGE.loginCommon)}
                  error={errors.login?.message}
                  name='login'
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
                  name='password'
                  type='text'
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
                    validate: (value) => checkInputValidation('login', value),
                  })}
                  validationMessage={getvalidationMessage('phone', VALIDATION_MESSAGE.phoneError)}
                  error={errors.phone?.message}
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
                  name='email'
                  type='email'
                />
              </div>
            </React.Fragment>
          )}
        </FormEl>
      </form>
      {authStatus === REQUEST_STATUS.pending && <Preloader />}
    </React.Fragment>
  );
};
