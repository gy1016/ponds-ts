import React, { FC } from 'react';
import AuthenticatedApp from '@/layouts';
import UnauthenticatedApp from '@/views/sys/unauthenticated-app';
import './App.less';

const App: FC = () => {
  const user = 'gy';

  return <div id="app">{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
};

export default App;
