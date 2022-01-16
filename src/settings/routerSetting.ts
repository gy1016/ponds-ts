import { createElement } from 'react';
import { TpRouterProps } from '@/types/global';
import { SnippetsOutlined, LineChartOutlined } from '@ant-design/icons';

const TpRouterArr: Array<TpRouterProps> = [
  {
    id: 1,
    label: '面板',
    path: 'taskponds/task',
    icon: createElement(SnippetsOutlined),
  },
  {
    id: 2,
    label: '分析',
    path: 'taskponds/analysis',
    icon: createElement(LineChartOutlined),
  },
];

export default TpRouterArr;
