export interface IForm {
  username: string;
  password: string;
  remember?: boolean;
}

export interface IUser {
  id: number;
  username: string;
  role: 'admin' | 'vistor';
  avatar: string;
  token?: string;
}
