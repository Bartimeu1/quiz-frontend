import { useSelector } from 'react-redux';
import { accessTokenSelector } from '@store/selectors/auth-selector';
import { Outlet, Navigate } from 'react-router-dom';
import { routes } from '@constants/routes';

interface ProtectedRouteProps {
  isPrivate?: boolean;
}

export const ProtectedRoute = ({ isPrivate }: ProtectedRouteProps) => {
  const accessToken = useSelector(accessTokenSelector);

  if (isPrivate) {
    return accessToken ? <Outlet /> : <Navigate to={routes.welcome} />;
  }

  return accessToken ? <Navigate to={routes.base} /> : <Outlet />;
};
