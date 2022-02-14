import { createElement } from 'react';
import { TpRouterProps } from '@/types/global';
import { SnippetsOutlined, LineChartOutlined, EditOutlined, FolderOpenOutlined } from '@ant-design/icons';

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
  {
    id: 4,
    label: '上传',
    path: 'source',
    icon: createElement(FolderOpenOutlined),
  },
];

export default TpRouterArr;
