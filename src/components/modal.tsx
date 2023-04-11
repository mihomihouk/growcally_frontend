import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children?: React.ReactNode;
  onDismiss?: () => void;
}
export const Modal: React.FC<ModalProps> = ({ children, onDismiss }) => {
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

  return ReactDOM.createPortal(
    <div
      className="flex flex-col items-center fixed bottom-0 right-0 left-0 top-0 z-[1000] bg-[#1e1e1e99]"
      onClick={() => onDismiss?.()}
    >
      <div
        className="absolute h-[616px] w-[537px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    containerEl
  );
};
