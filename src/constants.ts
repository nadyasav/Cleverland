import { ToastCloseBtn } from './components/toast-close-btn/toast-close-btn';
import { IValidationParams } from './types/custom-types';

export const ROUTES = {
  main: '/',
  books: '/books',
  registration: '/registration',
  auth: '/auth',
  forgotPass: '/forgot-pass/',
};
export const TERMS = {
  terms: 'Правила пользования',
  contract: 'Договор оферты',
};
export const NAVMENU_TEST_ID = {
  desktop: {
    nav: '',
    showcase: 'navigation-showcase',
    allBooks: 'navigation-books',
    terms: 'navigation-terms',
    contract: 'navigation-contract',
    prefix: 'navigation',
  },
  mobile: {
    nav: 'burger-navigation',
    showcase: 'burger-showcase',
    allBooks: 'burger-books',
    terms: 'burger-terms',
    contract: 'burger-contract',
    prefix: 'burger',
  },
};
export const API_URL = 'https://library-cleverland-2jfze.ondigitalocean.app';
export const REQUEST_STATUS = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};
export const REQUEST_ERRORS = {
  common: 'Что-то пошло не так. Обновите страницу через некоторое время.',
};
export const TOAST_SETTINGS = {
  position: 'top-center' as const,
  autoClose: false as const,
  hideProgressBar: true as const,
  newestOnTop: false as const,
  closeOnClick: true as const,
  rtl: false as const,
  pauseOnFocusLoss: true as const,
  draggable: true as const,
  pauseOnHover: true as const,
  theme: 'light' as const,
  closeButton: ToastCloseBtn,
};
export const SORT_TYPE = {
  asc: 'asc',
  desc: 'desc',
};
export const FILTER_ERROR = {
  common: 'По запросу ничего не найдено',
  category: 'В этой категории книг ещё нет',
};
export const VALIDATION_MESSAGE = {
  empty: 'Поле не может быть пустым',
  loginCommon: 'Используйте для логина латинский алфавит и цифры',
  passwCommon: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
  loginLatin: 'латинский алфавит',
  loginNumber: 'цифры',
  passwLength: 'не менее 8 символов',
  passwCapitalLetter: 'заглавной буквой',
  passwNumber: 'цифрой',
  authError: 'Неверный логин или пароль!',
  recoverEmail: 'На это email  будет отправлено письмо с инструкциями по восстановлению пароля',
  recoverPassError: 'Пароли не совпадают',
  phoneError: 'В формате +375 (xx) xxx-xx-xx',
  emailError: 'Введите корректный e-mail',
};
export const REGEX = {
  latin: /^(?=.*[a-z])/,
  numbers: /\d/,
  login: /^[a-zA-Z0-9\d@$#&\-\\_]{1,20}$/,
  length: /^(\w{8,})$/,
  capitalLetter: /(?=.*[A-Z])/,
  email: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,8})+$/,
};

export const validationParams: IValidationParams = {
  login: [
    {
      pattern: REGEX.login,
      error: `${VALIDATION_MESSAGE.loginLatin} ${VALIDATION_MESSAGE.loginNumber}`,
    },
    {
      pattern: REGEX.latin,
      error: VALIDATION_MESSAGE.loginLatin,
    },
    {
      pattern: REGEX.numbers,
      error: VALIDATION_MESSAGE.loginNumber,
    },
  ],
  password: [
    {
      pattern: REGEX.length,
      error: VALIDATION_MESSAGE.passwLength,
    },
    {
      pattern: REGEX.capitalLetter,
      error: VALIDATION_MESSAGE.passwCapitalLetter,
    },
    {
      pattern: REGEX.numbers,
      error: VALIDATION_MESSAGE.passwNumber,
    },
  ],
};
