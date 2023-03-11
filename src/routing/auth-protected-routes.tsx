import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '../constants';
import { useAuthUser } from '../hooks/use-auth-user';

export const AuthProtectedRoutes = () => {
  const { userExist } = useAuthUser();

  if (!userExist) {
    return <Navigate to={ROUTES.registration} />;
  }

  return <Outlet />;
};
