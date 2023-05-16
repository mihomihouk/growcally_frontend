import React from 'react';
import { Modal } from '../components/modal';
import { ModalType } from '../interfaces/modal-type';
import { hideModal } from '../slices/modals-slice';
import { useAppDispatch } from '../hooks/hooks';
import {
  ArrowRightOnRectangleIcon,
  FaceSmileIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { Button } from '../components/button';

export const AccountActionModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleDismissModal = () => {
    dispatch(hideModal({ modalType: ModalType.AccountAction }));
  };
  return (
    <Modal
      onDismiss={handleDismissModal}
      className="absolute !left-4 translate-x-0 -translate-y-1 w-48 h-64 bg-gray-600"
    >
      <AccountActionModalContainer />
    </Modal>
  );
};
const AccountActionModalContainer: React.FC = () => {
  return (
    <div className="flex px-4 py-11 h-full">
      <div className="flex flex-col justify-start gap-6 w-full">
        <Button
          type="button"
          className="flex text-white gap-4 cursor-pointer hover:bg-gray-500 py-2 px-2 rounded-md"
        >
          <FaceSmileIcon className="h6 w-6" />
          <p className="text-white font-normal text-base">Profile</p>
        </Button>
        <Button
          type="button"
          className="flex text-white gap-4 cursor-pointer hover:bg-gray-500 py-2 px-2 rounded-md"
        >
          <HeartIcon className="h6 w-6" />
          <p className="font-normal text-base">Likes</p>
        </Button>
        <Button
          type="button"
          className="flex text-white gap-4 cursor-pointer hover:bg-gray-500 py-2 px-2 rounded-md"
        >
          <ArrowRightOnRectangleIcon className="h6 w-6" />
          <p className="text-white font-normal text-base">Log out</p>
        </Button>
      </div>
    </div>
  );
};
