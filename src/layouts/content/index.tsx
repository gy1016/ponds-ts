import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

const PondsContent: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="panel" element={<div>任务面板</div>} />
        <Route path="analysis" element={<div>任务分析</div>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
};

export default PondsContent;
