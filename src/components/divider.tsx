import React from "react";

interface DividerProps {
  className: string;
}
export const Divider: React.FC<DividerProps> = ({ className }) => {
  return <div className={className}>BorderLine</div>;
};
