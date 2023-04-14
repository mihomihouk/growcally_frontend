import classNames from "classnames";
import React from "react";

interface VerticalDividerProps {
  borderColor: string;
}
export const VerticalDivider: React.FC<VerticalDividerProps> = ({
  borderColor,
}) => {
  return (
    <div
      className={classNames("h-full border-l-2 border-solid", borderColor)}
    />
  );
};
