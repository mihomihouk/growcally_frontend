import classNames from 'classnames';
import React from 'react';
type IntrinsicTextAreaProps = JSX.IntrinsicElements['textarea'];
interface TextAreaProps extends IntrinsicTextAreaProps {
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, hasError, errorMessage, cols = 10, ...props }, ref) => {
    return (
      <>
        <textarea
          className={classNames('w-full', className, {
            'border-error-500 border-2': hasError
          })}
          ref={ref}
          cols={cols}
          {...props}
        />
        {hasError && <p className="text-error-500">{errorMessage}</p>}
      </>
    );
  }
);
