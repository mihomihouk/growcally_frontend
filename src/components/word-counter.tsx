import classNames from 'classnames';
import React from 'react';

interface WordCounterProps {
  value: string;
  className?: string;
  max: number;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}
export const WordCounter: React.FC<WordCounterProps> = ({
  value,
  className,
  max,
  setError
}) => {
  const [count, setCount] = React.useState(0);
  React.useMemo(() => {
    const words = value.split(' ');
    const count = words.filter((word) => word !== '').length;
    setCount(count);
  }, [value]);
  React.useEffect(() => {
    if (count > max) {
      setError(true);
      return;
    }
    setError(false);
  }, [count]);

  return (
    <div className={classNames('justify-content', className)}>
      <p className="text-sm text-gray-500">
        {count}/{max}
      </p>
    </div>
  );
};
