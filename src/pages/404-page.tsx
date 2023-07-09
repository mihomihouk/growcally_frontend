import React from 'react';
import { Button } from '../components/button';
import { DASHBOARD_PATH, LOG_IN_PATH } from '../routes/routes';
import { useAppSelector } from '../hooks/hooks';

export const NotFoundPage: React.FC = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const path = currentUser ? DASHBOARD_PATH : LOG_IN_PATH;
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col text-center w-1/2 md:w-2/3 gap-3">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="text-xl text-gray-300">Page Not Found</p>
        <p className="text-lg text-gray-400">
          The requested page does not exist.
        </p>
        <Button
          isPrimary
          type="button"
          to={path}
          className="w-full md:!w-1/2 lg:!w-1/4 mx-auto"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};
