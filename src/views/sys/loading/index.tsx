import React, { FC } from 'react';
import { Spin } from 'antd';
import './index.less';

const Loading: FC = () => {
  return (
    <div className="tp-loading">
      <Spin />
    </div>
  );
};

export default Loading;
