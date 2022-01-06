import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const PondsMenu: FC = () => {
  return (
    <div>
      <Link to="/panel">面板</Link>
      <Link to="/analysis">分析</Link>
    </div>
  );
};

export default PondsMenu;
