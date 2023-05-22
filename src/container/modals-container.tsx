import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import { ModalType } from '../interfaces/modal-type';
import { CreatePostModal } from './create-post-modal';
import { AccountActionModal } from './account-action-modal';
import { LogoutModal } from './logout-modal';
import { PostDetailModal } from './post-detail-modal';
import { DeletePostModal } from './delete-post-modal';

export const Modals = [
  {
    type: ModalType.CreatePost,
    component: <CreatePostModal />
  },
  {
    type: ModalType.PostDetail,
    component: <PostDetailModal />
  },
  {
    type: ModalType.DeletePost,
    component: <DeletePostModal />
  },
  {
    type: ModalType.AccountAction,
    component: <AccountActionModal />
  },
  {
    type: ModalType.Logout,
    component: <LogoutModal />
  }
];

export const ModalsContainer: React.FC = () => {
  const visibleModals = useAppSelector((state) => state.modals);

  const renderModals = visibleModals.map((vm) => {
    const modalComponent = Modals.find(
      (m) => m.type === vm.modalType
    )?.component;
    return <React.Fragment key={vm.modalType}>{modalComponent}</React.Fragment>;
  });
  return <>{renderModals}</>;
};
