import React, { FC } from 'react';
import AuthenticatedApp from '@/layouts';
import UnauthenticatedApp from '@/views/sys/unauthenticated-app';
import useAuth from '@/hooks/useAuth';
import './App.less';

const App: FC = () => {
  const { user } = useAuth();

  return <div id="app">{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
  // return (
  //   <div id="app">
  //     <AuthenticatedApp />
  //   </div>
  // );
};

export default App;
