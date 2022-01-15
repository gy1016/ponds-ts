import React, { FC, useEffect, useMemo, useState, createContext, ReactNode } from 'react';
import * as auth from '@/api/user';
import { isExist, setToken, removeToken } from '@/utils/auth';
import { IForm, IUser } from '@/types/user';

interface IAuthContext {
  user: IUser | null;
  login: (form: IForm) => void;
  register: (form: IForm) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
AuthContext.displayName = 'AuthContext';

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const me = () =>
    auth
      .me()
      .then((res) => {
        const user = res?.data;
        setUser(user);
      })
      .catch((err) => {
        console.log(err, 'me响应拦截器返回的Promise.reject()被我抓到啦~');
      });

  const login = (form: IForm) => {
    setIsLoading(!isLoading);
    auth
      .login(form)
      .then((res) => {
        const user = res?.data;
        setToken(user.token);
        setUser(user);
        setIsLoading(!isLoading);
        if (form.remember) {
          let info = JSON.stringify({ u: form.username, p: form.password });
          localStorage.setItem('account', info);
        } else {
          localStorage.removeItem('account');
        }
      })
      .catch((err) => {
        setIsLoading(!isLoading);
        console.log(err, 'login响应拦截器返回的Promise.reject()被我抓到啦~');
      });
  };

  const register = (form: IForm) => {
    setIsLoading(!isLoading);
    auth
      .register(form)
      .then((res) => {
        const user = res?.data;
        setToken(user.token);
        setUser(user);
        setIsLoading(!isLoading);
      })
      .catch((err) => {
        setIsLoading(!isLoading);
        console.log(err, 'register响应拦截器返回的Promise.reject()被我抓到啦~');
      });
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  useEffect(() => {
    if (isExist()) {
      me();
    }
  }, []);

  return (
    <AuthContext.Provider value={useMemo(() => ({ user, login, register, logout }), [user, login, register, logout])}>
      {children}
    </AuthContext.Provider>
  );
};
