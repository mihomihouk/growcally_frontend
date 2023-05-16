import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import React from 'react';

interface SecureRouteProps {
  children?: React.ReactNode;
}
export const SecureRoute: React.FC<SecureRouteProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  console.log(pathname, isAuthenticated);

  if (!isAuthenticated) {
    const redirect = encodeURIComponent(pathname);
    return <Navigate to={`/login?redirect=${redirect}`} />;
  }

  return <>{children}</>;
};

export default SecureRoute;
