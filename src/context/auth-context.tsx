import React, { FC, useEffect, useMemo, useState, createContext, ReactNode } from 'react';
import * as auth from '@/api/user';
import { isExist, setToken, removeToken } from '@/utils/auth';
import { IUser } from '@/types/user';

interface IAuthContext {
  user: any;
  login: (form: IUser) => void;
  register: (form: IUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (form: IUser) => {
    setIsLoading(true);
    auth
      .login(form)
      .then((res) => {
        const user = res?.data;
        setToken(user.token);
        setUser(user);
        setIsLoading(false);
        if (form.remember) {
          let info = JSON.stringify({ u: form.username, p: form.password });
          localStorage.setItem('account', info);
        } else {
          localStorage.removeItem('account');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err, 'login响应拦截器返回的Promise.reject()被我抓到啦~');
      });
  };

  const register = (form: IUser) => {
    setIsLoading(true);
    auth
      .register(form)
      .then((res) => {
        const user = res?.data;
        setToken(user.token);
        setUser(user);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err, 'register响应拦截器返回的Promise.reject()被我抓到啦~');
      });
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={useMemo(() => ({ user, login, register, logout }), [user, login, register, logout])}>
      {children}
    </AuthContext.Provider>
  );
};
