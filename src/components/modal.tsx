import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onDismiss?: () => void;
}
export const Modal: React.FC<ModalProps> = ({ children, title, onDismiss }) => {
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
      <div className="absolute h-[616px] w-[537px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl bg-slate-800">
        <div className="flex h-full w-full flex-col rounded-2xl divide-y divide-zinc-500">
          {/* header */}
          <div className="h-[50px] flex justify-center items-center">
            {title && (
              <p className="text-base font-semibold text-white">{title}</p>
            )}
          </div>
          <div className="flex justify-center items-center h-full w-full">
            {children}
          </div>
        </div>
      </div>
    </div>,
    containerEl
  );
};
