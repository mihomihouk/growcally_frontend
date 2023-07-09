import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import React from 'react';
import { LOG_IN_PATH } from './routes';

interface SecureRouteProps {
  children?: React.ReactNode;
}
export const SecureRoute: React.FC<SecureRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={LOG_IN_PATH} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
