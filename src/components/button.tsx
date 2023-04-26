import { Link, LinkProps } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  to?: LinkProps['to'];
  children?: React.ReactNode;
  inNav?: boolean;
  isPrimary?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  to,
  inNav,
  isPrimary,
  children
}) => {
  const hrefTo = to ?? '#';
  return (
    <Link
      className={classNames(
        {
          'py-2 pl-3 rounded-3xl hover:bg-gray-300 ease-in duration-300': inNav
        },
        {
          'text-white font-semibold text-sm py-[7px] px-4 rounded-lg bg-primary-500 hover:bg-primary-400':
            isPrimary
        },
        className
      )}
      onClick={onClick}
      to={hrefTo}
    >
      <button className={classNames('w-full', { 'flex gap-4': inNav })}>
        {children}
      </button>
    </Link>
  );
};
