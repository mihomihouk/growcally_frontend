import { Link, LinkProps } from "react-router-dom";
import React from "react";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  to?: LinkProps["to"];
  children?: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({
  className,
  onClick,
  to,
  children,
}) => {
  const hrefTo = to ?? "#";
  return (
    <Link className={className} onClick={onClick} to={hrefTo}>
      {children}
    </Link>
  );
};
