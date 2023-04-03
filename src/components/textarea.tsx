import classNames from "classnames";
import React from "react";
type IntrinsicTextAreaProps = JSX.IntrinsicElements["textarea"];
interface TextAreaProps extends IntrinsicTextAreaProps {
  label?: string;
  hasError?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <form>
        <textarea
          className={classNames("w-full", className)}
          ref={ref}
          {...props}
        />
      </form>
    );
  }
);
