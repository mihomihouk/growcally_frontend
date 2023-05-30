import React from 'react';
import { Modal } from '../components/modal';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { ModalType } from '../interfaces/modal-type';
import { hideModal, resetModal } from '../slices/modals-slice';
import { Button } from '../components/button';
import { DeletePost } from '../api/media.service';

export const DeletePostModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleDismissModal = () => {
    dispatch(hideModal({ modalType: ModalType.DeletePost }));
  };
  return (
    <Modal
      onDismiss={handleDismissModal}
      className="absolute w-full md:!w-[500px] !h-[250px]"
    >
      <DeletePostModalContainer onDismiss={handleDismissModal} />
    </Modal>
  );
};

interface DeletePostModalContainerProps {
  onDismiss: () => void;
}
export const DeletePostModalContainer: React.FC<
  DeletePostModalContainerProps
> = ({ onDismiss }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const currentUser = useAppSelector((state) => state.auth.user);
  const currentPost = useAppSelector((state) => state.posts.currentPost);
  const dispatch = useAppDispatch();

  const handleDeletePost = async () => {
    setIsLoading(true);
    if (!currentUser || !currentPost) {
      return;
    }

    const { isSuccess, alertMessage } = await DeletePost({
      userId: currentUser.id,
      postId: currentPost.id
    });
    if (!isSuccess) {
      alert(alertMessage);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    dispatch(resetModal());
  };
  return (
    <div className="h-full p-8 text-white">
      <div className="h-2/3 flex flex-col gap-4">
        <p className="text-xl font-semibold">Delete Post</p>
        <p className="text-base">Are you sure you want to delete this post?</p>
      </div>
      <div className="flex justify-end h-1/3 gap-4">
        <Button
          type="button"
          isSecondary
          className="w-40 h-12"
          onClick={onDismiss}
        >
          Cancel
        </Button>
        <Button
          type="button"
          isWarning
          className="w-40 h-12"
          onClick={handleDeletePost}
          isLoading={isLoading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
