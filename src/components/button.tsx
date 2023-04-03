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
}
export const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  to,
  isMain,
  children,
}) => {
  const hrefTo = to ?? "#";
  return (
    <Link
      className={classNames(
        {
          [styles.main]: isMain,
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
