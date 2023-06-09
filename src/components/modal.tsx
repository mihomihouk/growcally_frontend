import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  children?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}
export const Modal: React.FC<ModalProps> = ({
  children,
  onDismiss,
  className
}) => {
  const containerEl = document.getElementById('portal');

  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss && onDismiss();
      }
    };

    document.querySelector('body')?.classList.add('overflow-hidden');
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.querySelector('body')?.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onDismiss]);

  if (!containerEl) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="flex flex-col items-center fixed bottom-0 right-0 left-0 top-0 z-[1000] bg-[#1e1e1e99]"
      onClick={() => onDismiss?.()}
      data-testid="modal"
    >
      <div
        className={classNames(
          className,
          'sm:w-[600px] sm:h-[500px] md:w-[700px] md:h-[600px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl bg-gray-800'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    containerEl
  );
};
