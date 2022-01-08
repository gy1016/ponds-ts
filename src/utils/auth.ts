const localStorageKey = '__tp_auth_token__';

export const isExist = () => window.localStorage.getItem(localStorageKey) !== null;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const setToken = (token: string) => window.localStorage.setItem(localStorageKey, token || '');

export const removeToken = () => window.localStorage.removeItem(localStorageKey);
