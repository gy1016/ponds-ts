import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用');
  }
  return context;
};

export default useAuth;
