export const getLocalStorage = (item: string) => (localStorage.getItem(item) ? localStorage.getItem(item) || '' : '');
