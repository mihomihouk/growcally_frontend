import { Link, LinkProps } from 'react-router-dom';
import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { FadeLoader } from 'react-spinners';

const spinnerOverride: CSSProperties = {
  margin: '0 auto',
  top: '30px'
};

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  to?: LinkProps['to'];
  children?: React.ReactNode;
  inNav?: boolean;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isWarning?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  type: 'button' | 'reset' | 'submit' | undefined;
  testId?: string;
}
export const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  to,
  inNav,
  isPrimary,
  isSecondary,
  isWarning,
  type,
  testId,
  disabled,
  isLoading,
  children
}) => {
  const hrefTo = to ?? '#';
  if (isLoading) {
    return (
      <FadeLoader
        data-testid="loading"
        loading={isLoading}
        height={10}
        width={10}
        cssOverride={spinnerOverride}
        aria-label="Loading Spinner"
      />
    );
  }

  if (to) {
    return (
      <Link
        className={classNames(
          {
            'pl-0 lg:pl-3 py-2 rounded-3xl hover:bg-gray-300 ease-in duration-300':
              inNav
          },
          {
            'w-full bg-primary-500 text-white inline-block p-2 rounded-lg hover:bg-opacity-75 focus:outline-none focus:ring focus:border-primary-800':
              isPrimary
          },
          {
            'w-full bg-secondary-500 text-white inline-block p-2 rounded-lg hover:bg-opacity-75 focus:outline-none focus:ring focus:border-secondary-800':
              isSecondary
          },
          {
            'w-full bg-error-500 text-white inline-block p-2 rounded-lg hover:bg-opacity-75 focus:outline-none focus:ring focus:border-error-800':
              isWarning
          },
          {
            'cursor-not-allowed': disabled
          },
          className
        )}
        to={hrefTo}
      >
        <button
          className={classNames(
            'w-full',
            { 'flex gap-4': inNav },
            {
              'cursor-not-allowed': disabled
            }
          )}
          data-testid={testId}
          tabIndex={0}
          onClick={onClick}
          disabled={disabled}
          type={type}
        >
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={classNames(
        {
          'w-full bg-primary-500 text-white inline-block p-2 rounded-lg hover:bg-opacity-75':
            isPrimary
        },
        {
          'w-full bg-secondary-500 text-white inline-block p-2 rounded-lg hover:bg-opacity-75':
            isSecondary
        },
        {
          'w-full bg-error-500 text-white inline-block p-2 rounded-lg hover:bg-opacity-75':
            isWarning
        },
        {
          'py-2 lg:pl-3 rounded-3xl hover:bg-gray-300 ease-in duration-300 flex gap-4 w-full ':
            inNav
        },
        {
          'cursor-not-allowed': disabled
        },
        className
      )}
      data-testid={testId}
      tabIndex={0}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
