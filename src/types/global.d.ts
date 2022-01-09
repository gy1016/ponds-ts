import { ReactNode } from 'react';

declare interface TpRouterProps {
  id: number; // 路由ID
  path: string; // 路由地址
  label: string; // 路由名称
  icon: ReactNode; // 路由图标
  seniorId?: number; // 父级路由ID
  children?: Array<TpRouterProps>[]; // 子级路由
}

declare interface TpViewProps {
  id: number; // 视图ID
  path: string; // 对应路径
  element: ReactNode; // 对应组件
  lazy: boolean; // 是否懒加载
  default?: boolean; // 是否为默认视图
}
