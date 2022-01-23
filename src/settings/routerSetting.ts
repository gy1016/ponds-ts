import { createElement } from 'react';
import { TpRouterProps } from '@/types/global';
import { SnippetsOutlined, LineChartOutlined, EditOutlined } from '@ant-design/icons';

const TpRouterArr: Array<TpRouterProps> = [
  {
    id: 1,
    label: '面板',
    path: 'task',
    icon: createElement(SnippetsOutlined),
  },
  {
    id: 2,
    label: '分析',
    path: 'analysis',
    icon: createElement(LineChartOutlined),
  },
  {
    id: 3,
    label: '今日',
    path: 'today',
    icon: createElement(EditOutlined),
  },
];

export default TpRouterArr;
