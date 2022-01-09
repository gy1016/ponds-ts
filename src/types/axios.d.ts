export interface TpServerResult<T = any> {
  code: number;
  type?: 'success' | 'error' | 'warning';
  msg: string;
  data: T;
}
