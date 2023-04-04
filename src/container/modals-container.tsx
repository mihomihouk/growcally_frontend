import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { ModalType } from "../interfaces/modal-type";
import { CreatePostModal } from "./create-post-modal";

export const Modals = [
  {
    type: ModalType.CreatePost,
    component: <CreatePostModal />,
  },
];

export const ModalsContainer: React.FC = () => {
  const visibleModals = useAppSelector((state) => state.modal);

  const renderModals = visibleModals.map((vm) => {
    const modalComponent = Modals.find(
      (m) => m.type === vm.modalType
    )?.component;
    return <React.Fragment key={vm.modalType}>{modalComponent}</React.Fragment>;
  });
  return <>{renderModals}</>;
};
