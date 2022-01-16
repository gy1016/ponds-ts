import { createElement, lazy } from 'react';
import { TpViewProps } from '@/types/global';
import TaskPanel from '@/views/task-panel';

const AnalysisPanel = lazy(() => import(/* webpackChunkName: "analysis" */ '@/views/analysis-panel'));
const ErrorPage = lazy(() => import(/* webpackChunkName: "error" */ '@/views/sys/error'));

const TpViewArr: Array<TpViewProps> = [
  {
    id: 1,
    path: 'taskponds/task',
    element: createElement(TaskPanel),
    lazy: false,
    default: true,
  },
  {
    id: 2,
    path: 'taskponds/analysis',
    element: createElement(AnalysisPanel),
    lazy: true,
  },
  {
    id: 99,
    path: '*',
    element: createElement(ErrorPage),
    lazy: true,
  },
];

export default TpViewArr;
