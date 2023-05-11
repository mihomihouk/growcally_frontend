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
  disabled?: boolean;
  isLoading?: boolean;
  type: 'button' | 'reset' | 'submit' | undefined;
}
export const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  to,
  inNav,
  isPrimary,
  type,
  disabled,
  isLoading,
  children
}) => {
  const hrefTo = to ?? '#';
  if (isLoading) {
    return (
      <FadeLoader
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
            'py-2 pl-3 rounded-3xl hover:bg-gray-300 ease-in duration-300':
              inNav
          },
          {
            'w-full bg-primary-500 text-white inline-block p-2 rounded-lg hover:bg-opacity-75':
              isPrimary
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
          'py-2 lg:pl-3 rounded-3xl hover:bg-gray-300 ease-in duration-300 flex gap-4 w-full ':
            inNav
        },
        {
          'cursor-not-allowed': disabled
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
