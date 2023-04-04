import React from "react";
import { Modal } from "../components/modal";
import { Button } from "../components/button";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../hooks/hooks";
import { hideModal } from "../slices/modal-slice";
import { ModalType } from "../interfaces/modal-type";

export const CreatePostModal: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Modal
      title="Create new post"
      onDismiss={() => dispatch(hideModal({ modalType: ModalType.CreatePost }))}
    >
      <div className="text-center">
        <PhotoIcon className="h-20 w-20 text-white mx-auto" />
        <p className="text-white text-xl font-normal my-4">
          Drag photos and videos here
        </p>
        <Button isPrimary>Select From Computer</Button>
      </div>
    </Modal>
  );
};
