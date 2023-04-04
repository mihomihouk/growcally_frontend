import { Link, LinkProps } from "react-router-dom";
import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  to?: LinkProps["to"];
  children?: React.ReactNode;
  isMain?: boolean;
  isPrimary?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  to,
  isMain,
  isPrimary,
  children,
}) => {
  const hrefTo = to ?? "#";
  return (
    <Link
      className={classNames(
        {
          [styles.main]: isMain,
        },
        {
          [styles.primary]: isPrimary,
        },
        className
      )}
      onClick={onClick}
      to={hrefTo}
    >
      {children}
    </Link>
  );
};
