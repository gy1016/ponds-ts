import React, { FC } from 'react';
import './index.less';

const TodayPanel: FC = () => {
  return (
    <div className="today-panel">
      <div className="today-panel-pdf">PDF面板</div>
      <div className="today-panel-webgl">WebGL知识图谱</div>
    </div>
  );
};

export default TodayPanel;
