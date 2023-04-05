import React from "react";
import { Modal } from "../components/modal";
import { Button } from "../components/button";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "../hooks/hooks";
import { hideModal } from "../slices/modal-slice";
import { ModalType } from "../interfaces/modal-type";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";

export const CreatePostModal: React.FC = () => {
  const dispatch = useAppDispatch();
  interface AcceptedFile extends File {
    preview: string;
  }
  const [files, setFiles] = React.useState<AcceptedFile[]>([]);
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  }, []);
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({ onDrop, accept: { "image/*": [] } });

  const thumbs = files.map((f) => (
    <div className="relative">
      <div className="overflow-hidden min-w-0">
        <img
          src={f.preview}
          alt="accepted file"
          className="block w-auto h-full"
        />
      </div>
      <Button className="absolute top-1 right-1">
        <TrashIcon className="h-5 w-5 text-white" />
      </Button>
    </div>
  ));
  const hasFiles = files.length > 0;
  const modalTitle = hasFiles ? "Crop" : "Create new post";

  return (
    <Modal
      title={modalTitle}
      onDismiss={() => dispatch(hideModal({ modalType: ModalType.CreatePost }))}
    >
      {!hasFiles && (
        <div
          className={classNames(
            "flex flex-col p-5 ease-in-out duration-75 border-dashed border-blue-500 border-2 text-center cursor-default rounded-2xl",
            {
              "!border-green-500": isDragAccept,
              "!border-red-500": isDragReject,
            }
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <PhotoIcon className="h-20 w-20 text-white mx-auto" />
          <p className="text-white text-xl font-normal my-4">
            Drag photos and videos here
          </p>
          <Button isPrimary>Select From Computer</Button>
        </div>
      )}
      {hasFiles && <div>{thumbs}</div>}
    </Modal>
  );
};
