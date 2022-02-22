import React, { FC } from 'react';
import AuthenticatedApp from '@/layouts';
import UnauthenticatedApp from '@/views/sys/unauthenticated-app';
import useAuth from '@/hooks/useAuth';
import { ErrorBoundary } from './components/error-boundary';
import ErrorPage from './views/sys/error';
import './App.less';

const App: FC = () => {
  const { user } = useAuth();

  return (
    <div id="app">
      <ErrorBoundary fallbackRender={ErrorPage}>{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</ErrorBoundary>
    </div>
  );
};

export default App;
