import classNames from 'classnames';
import React from 'react';

interface ThumbnailProps {
  src: string;
  className?: string;
  onClick?: () => void;
  alt: string;
}
export const Thumbnail: React.FC<ThumbnailProps> = ({
  src,
  className,
  onClick,
  alt
}) => {
  return (
    <div
      className={classNames(
        'w-12 h-12 rounded-full border-2 border-gray-500',
        className
      )}
      onClick={onClick}
    >
      <img
        className="rounded-full object-cover w-12 h-12"
        src={src}
        alt={alt}
      />
    </div>
  );
};
