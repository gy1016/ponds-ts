import React, { FC } from 'react';
import UnauthenticatedApp from './views/sys/unauthenticated-app';

const App: FC = () => {
  const user = 'gy';

  return <div id="app">{user ? <div>登录成功</div> : <UnauthenticatedApp />}</div>;
};

export default App;
