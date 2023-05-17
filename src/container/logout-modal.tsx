import React from 'react';
import { Modal } from '../components/modal';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { ModalType } from '../interfaces/modal-type';
import { hideModal } from '../slices/modals-slice';
import { Button } from '../components/button';
import { logoutUser } from '../api/auth.service';
import { LOG_IN_PATH } from '../routes/routes';
import { useNavigate } from 'react-router-dom';

export const LogoutModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleDismissModal = () => {
    dispatch(hideModal({ modalType: ModalType.Logout }));
  };
  return (
    <Modal
      onDismiss={handleDismissModal}
      className="absolute !w-[500px] !h-[250px]"
    >
      <LogoutModalContainer onDismiss={handleDismissModal} />
    </Modal>
  );
};

interface LogoutModalContainerProps {
  onDismiss: () => void;
}
export const LogoutModalContainer: React.FC<LogoutModalContainerProps> = ({
  onDismiss
}) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const currentUser = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    if (!currentUser) {
      return;
    }

    const { isSuccess, alertMessage } = await logoutUser(currentUser.id);
    if (!isSuccess) {
      alert(alertMessage);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    navigate(LOG_IN_PATH);
  };
  return (
    <div className="h-full p-8 text-white">
      <div className="h-2/3 flex flex-col gap-4">
        <p className="text-xl font-semibold">Logout</p>
        <p className="text-base">Are you sure you want to logout?</p>
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
          onClick={handleLogout}
          isLoading={isLoading}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
