import React, { FC } from 'react';
import PondsMenu from './menu';
import PondsContent from './content';

const AuthenticatedApp: FC = () => {
  return (
    <div>
      <header>头部</header>
      <PondsMenu />
      <PondsContent />
    </div>
  );
};

export default AuthenticatedApp;
