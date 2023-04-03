import React from "react";

interface ModalProps {
  children?: React.ReactNode;
}
export const Modal: React.FC<ModalProps> = ({ children }) => {
  return <div>{children}</div>;
};
