import classNames from "classnames";
import React from "react";

interface WordCounterProps {
  value: string;
  className?: string;
}
export const WordCounter: React.FC<WordCounterProps> = ({
  value,
  className,
}) => {
  const [count, setCount] = React.useState(0);
  React.useMemo(() => {
    const words = value.split(" ");
    const count = words.filter((word) => word !== "").length;
    setCount(count);
  }, [value]);
  return (
    <div className={classNames("justify-content", className)}>
      <p className="text-sm text-gray-500">{count}/2,200</p>
    </div>
  );
};
