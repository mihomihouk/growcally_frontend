import React from 'react';
import { Modal } from '../components/modal';
import { ModalType } from '../interfaces/modal-type';
import { hideModal, showModal } from '../slices/modals-slice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  ArrowRightOnRectangleIcon,
  FaceSmileIcon,
  NewspaperIcon
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
      className="absolute md:!left-4 translate-x-0 !w-48 !h-64 !bg-gray-600 !translate-y-10"
    >
      <AccountActionModalContainer />
    </Modal>
  );
};
const AccountActionModalContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const personalPagePath = currentUser?.id;
  return (
    <div className="flex px-4 py-11 h-full">
      <div className="flex flex-col justify-start gap-6 w-full">
        <Button
          type="button"
          className="flex text-white gap-4 cursor-pointer hover:bg-gray-500 py-2 px-2 rounded-md"
        >
          <FaceSmileIcon className="h-6 w-6" />
          <p className="text-white font-normal text-base">Profile</p>
        </Button>

        <Button
          type="button"
          className="flex text-white gap-4 cursor-pointer hover:bg-gray-500 py-2 px-2 rounded-md"
          inNav
          to={personalPagePath}
        >
          <NewspaperIcon className="h-6 w-6" />
          <p className="text-white font-normal text-base">My posts</p>
        </Button>

        <Button
          type="button"
          className="flex text-white gap-4 cursor-pointer hover:bg-gray-500 py-2 px-2 rounded-md"
          onClick={() => dispatch(showModal({ modalType: ModalType.Logout }))}
        >
          <ArrowRightOnRectangleIcon className="h6 w-6" />
          <p className="text-white font-normal text-base">Log out</p>
        </Button>
      </div>
    </div>
  );
};
