import React from "react";
import { Modal } from "../components/modal";
import { Button } from "../components/button";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { hideModal } from "../slices/modal-slice";
import { ModalType } from "../interfaces/modal-type";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import { TextArea } from "../components/textarea";
import { WordCounter } from "../components/word-counter";
import { Accordion } from "../components/accordion";
import {
  UploadFileState,
  addFiles,
  resetFiles,
  updateCaption,
  updateAlt,
} from "../slices/upload-file-slice";
import { v4 } from "uuid";

export const CreatePostModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const uploadFiles = useAppSelector((state) => state.uploadFile);
  const [showCaptionEditor, toggleCaptionEditor] =
    React.useState<boolean>(false);
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: v4(),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file),
    }));
    dispatch(addFiles(newFiles));
  }, []);
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({ onDrop, accept: { "image/*": [] } });

  const thumbs = uploadFiles.files?.map((f, index) => (
    <div
      className="relative border-white border-2 h-[200px] w-[200px] p-2"
      key={index}
    >
      <div className="overflow-hidden min-w-0 flex items-center justify-center h-full">
        <img src={f.preview} alt="accepted file" className="block" />
      </div>
      <Button className="absolute top-1 right-1">
        <TrashIcon className="h-5 w-5 text-white" />
      </Button>
    </div>
  ));

  const hasFiles = (uploadFiles?.files ?? []).length > 0;
  const modalTitle = hasFiles ? "Crop" : "Create new post";
  const nextActionText = hasFiles && !showCaptionEditor ? "Next" : "Share";

  const handleClickNextAction = () => {
    if (!showCaptionEditor) {
      toggleCaptionEditor(true);
      return;
    }

    if (showCaptionEditor) {
      // submit
      // close modal
      return;
    }
  };

  const handleDismissModal = () => {
    dispatch(resetFiles());
    dispatch(hideModal({ modalType: ModalType.CreatePost }));
  };

  return (
    <Modal
      title={modalTitle}
      hasBackButton={hasFiles || showCaptionEditor}
      hasNextActionButton={hasFiles || showCaptionEditor}
      nextActionText={nextActionText}
      onClickBack={() => dispatch(resetFiles())}
      onClickNextAction={() => handleClickNextAction()}
      onDismiss={handleDismissModal}
    >
      {!hasFiles && (
        <div
          className={classNames(
            "flex flex-col p-5 ease-in-out duration-75 border-dashed border-primary-500 border-2 text-center cursor-default rounded-2xl",
            {
              "!border-success-500": isDragAccept,
              "!border-error-500": isDragReject,
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
      {hasFiles && !showCaptionEditor && (
        <div className="flex flex-wrap flex-row gap-5">{thumbs}</div>
      )}
      {hasFiles && showCaptionEditor && (
        <div className="flex flex-row h-full">
          <div className="flex flex-wrap flex-row gap-5 w-3/5 justify-center p-4">
            {thumbs}
          </div>
          <CaptionEditor files={uploadFiles.files} />
        </div>
      )}
    </Modal>
  );
};
interface CaptionEditorProps {
  files?: UploadFileState[];
}

const CaptionEditor: React.FC<CaptionEditorProps> = ({ files }) => {
  const { caption } = useAppSelector((state) => state.uploadFile);
  const dispatch = useAppDispatch();

  if (!files) {
    return null;
  }

  const renderFileList = (
    <ul>
      {files.map((f) => (
        <FileItem file={f} key={f.preview} />
      ))}
    </ul>
  );

  return (
    <div className="w-2/5 overflow-y-auto p-4">
      <div className="flex gap-1 items-center pb-[14px]">
        <p className="text-white text-sm">mihomihouk</p>
      </div>
      <TextArea
        placeholder="Write a caption..."
        cols={10}
        className="bg-transparent p-2 max-h-[200px] text-gray-400"
        value={caption || ""}
        onChange={(e) => dispatch(updateCaption(e.target.value))}
      />
      <WordCounter value={caption || ""} className="flex justify-end" />
      <Accordion title="Accessibility" headerColorTheme="white">
        <div>
          <p className="text-gray-400 text-sm">
            Alt text describes your photos for people with visual impairments.
            Alt text will be automatically created for your photos or you can
            choose to write your own.
          </p>
          {renderFileList}
        </div>
      </Accordion>
    </div>
  );
};

interface fileItemProps {
  file: UploadFileState;
}
const FileItem: React.FC<fileItemProps> = ({ file }) => {
  const dispatch = useAppDispatch();

  return (
    <li className="flex gap-2 align-items max-h-[300px] py-2">
      <img src={file.preview} alt="accepted files" className="w-[50px]" />
      <input
        placeholder="Write alt text..."
        className="bg-transparent max-w-[120px] p-1 text-gray-400"
        value={file.alt || ""}
        onChange={(e) => dispatch(updateAlt({ ...file, alt: e.target.value }))}
      />
    </li>
  );
};
