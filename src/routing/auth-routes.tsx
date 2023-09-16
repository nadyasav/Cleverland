import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '../constants';
import { useAuthUser } from '../hooks/use-auth-user';

export const AuthRoutes = () => {
  const { userExist } = useAuthUser();

  if (userExist) {
    return <Navigate to={ROUTES.main} />;
  }

  return <Outlet />;
};
