import { ToastCloseBtn } from './components/toast-close-btn/toast-close-btn';

export const ROUTES = {
  main: '/',
  books: '/books',
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
export const API_URL = 'https://strapi.cleverland.by';
export const API_URL_IMG = 'https://strapi.cleverland.by';
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
