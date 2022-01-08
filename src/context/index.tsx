import React, { FC, ReactNode } from 'react';
import { AuthProvider } from './auth-context';

export const AppProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
