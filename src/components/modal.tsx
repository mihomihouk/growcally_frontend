import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "./button";
import classNames from "classnames";

interface ModalProps {
  title?: string;
  hasBackButton?: boolean;
  hasNextActionButton?: boolean;
  nextActionText?: string;
  onClickNextAction?: () => void;
  onClickBack?: () => void;
  children?: React.ReactNode;
  onDismiss?: () => void;
}
export const Modal: React.FC<ModalProps> = ({
  hasBackButton = false,
  hasNextActionButton = false,
  nextActionText,
  onClickNextAction,
  onClickBack,
  children,
  title,
  onDismiss,
}) => {
  const containerEl = document.getElementById("portal");

  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDismiss && onDismiss();
      }
    };

    document.querySelector("body")?.classList.add("overflow-hidden");
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onDismiss]);

  if (!containerEl) {
    return null;
  }
  const applyHeaderSpaceBetween = hasBackButton && hasNextActionButton;
  return ReactDOM.createPortal(
    <div
      className="flex flex-col items-center fixed bottom-0 right-0 left-0 top-0 z-[1000] bg-[#1e1e1e99]"
      onClick={() => onDismiss?.()}
    >
      <div
        className="absolute h-[616px] w-[537px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full w-full flex-col rounded-2xl divide-y divide-gray-500">
          {/* header */}
          <div
            className={classNames("h-[50px] flex justify-center items-center", {
              "!justify-between px-4": applyHeaderSpaceBetween,
            })}
          >
            {hasBackButton && (
              <Button
                className="cursor-pointer"
                onClick={() => onClickBack?.()}
              >
                <ArrowLeftIcon className="h-5 w-5 text-white hover:text-gray-300" />
              </Button>
            )}
            {title && (
              <p className="text-base font-semibold text-white">{title}</p>
            )}
            {hasNextActionButton && (
              <Button
                className="text-primary-500 hover:text-primary-300 cursor-pointer"
                onClick={() => onClickNextAction?.()}
              >
                {nextActionText}
              </Button>
            )}
          </div>
          {/* content */}
          <div className="flex justify-center items-center h-full w-full">
            {children}
          </div>
        </div>
      </div>
    </div>,
    containerEl
  );
};
