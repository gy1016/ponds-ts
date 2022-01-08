import React from 'react';
import { TpRouterProps } from '@/types/global';
import { SnippetsOutlined, LineChartOutlined } from '@ant-design/icons';

const TpRouterArr: Array<TpRouterProps> = [
  {
    id: 1,
    label: '面板',
    path: 'panel',
    icon: React.createElement(SnippetsOutlined),
  },
  {
    id: 2,
    label: '分析',
    path: 'analysis',
    icon: React.createElement(LineChartOutlined),
  },
];

export default TpRouterArr;
