import { ReactNode } from 'react';

declare interface TpRouterProps {
  id: number; // 路由ID
  path: string; // 路由地址
  label: string; // 路由名称
  icon: ReactNode; // 路由图标
  seniorId?: number; // 父级路由ID
  children?: Array<TpRouterProps>[]; // 子级路由
}
