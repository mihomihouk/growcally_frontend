import React from 'react';
import { Button } from '../components/button';
import { LOG_IN_PATH } from '../routes/routes';

export const NotFoundPage: React.FC = () => {
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
          to={LOG_IN_PATH}
          className="!w-1/2 mx-auto"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};
