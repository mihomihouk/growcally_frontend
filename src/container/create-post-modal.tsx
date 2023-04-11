import React from "react";
import { Modal } from "../components/modal";
import { Button } from "../components/button";
import {
  ArrowLeftIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch } from "../hooks/hooks";
import { hideModal } from "../slices/modal-slice";
import { ModalType } from "../interfaces/modal-type";
import { useDropzone } from "react-dropzone";
import classNames from "classnames";
import { TextArea } from "../components/textarea";
import { WordCounter } from "../components/word-counter";
import { Accordion } from "../components/accordion";
import { uploadPost } from "../api/media.service";
import { UploadFile } from "../interfaces/post";

export const CreatePostModal: React.FC = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const dispatch = useAppDispatch();

  const hasFiles = (files ?? []).length > 0;

  const handleDismissModal = () => {
    setFiles([]);
    dispatch(hideModal({ modalType: ModalType.CreatePost }));
  };

  return (
    <Modal onDismiss={handleDismissModal}>
      {hasFiles ? (
        <UploadForm
          files={files}
          setFiles={setFiles}
          onDismiss={handleDismissModal}
        />
      ) : (
        <DragAndDrop files={files} setFiles={setFiles} />
      )}
    </Modal>
  );
};
interface DragAndDropProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}
const DragAndDrop: React.FC<DragAndDropProps> = ({ files, setFiles }) => {
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({ onDrop, accept: { "image/*": [] } });

  return (
    <div className="flex h-full w-full flex-col rounded-2xl divide-y divide-gray-500">
      {/* header */}
      <div className="h-[50px] flex justify-center items-center">
        <p className="text-base font-semibold text-white">Create new post</p>
      </div>
      {/* content */}
      <div className="flex justify-center items-center h-full w-full">
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
      </div>
    </div>
  );
};

interface UploadFormProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  onDismiss: () => void;
}

interface AltTextState {
  altText: string;
  fileName: string;
}

const UploadForm: React.FC<UploadFormProps> = ({
  files,
  setFiles,
  onDismiss,
}) => {
  const [caption, setCaption] = React.useState<string>("");
  const [altTexts, setAltTexts] = React.useState<AltTextState[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getAltText = (fileName: string) => {
      return altTexts.find((altText) => altText.fileName === fileName)?.altText;
    };
    const newFiles: UploadFile[] = [];
    files.forEach((file) => {
      const fileObject = {
        file: file,
        altText: getAltText(file.name) ?? "",
      };
      newFiles.push(fileObject);
    });

    const post = {
      caption,
      files: newFiles,
    };
    uploadPost(post);
    onDismiss();
  };
  const handleDeleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };
  const thumbs = files.map((file) => (
    <div
      className="relative border-white border-2 h-[200px] w-[200px] p-2"
      key={file.name}
    >
      <div className="overflow-hidden min-w-0 flex items-center justify-center h-full">
        <img
          src={URL.createObjectURL(file)}
          alt="accepted file"
          className="block"
        />
      </div>
      <Button
        className="absolute top-1 right-1"
        onClick={() => handleDeleteFile(file.name)}
      >
        <TrashIcon className="h-5 w-5 text-white" />
      </Button>
    </div>
  ));
  return (
    <form
      className="flex h-full w-full flex-col rounded-2xl divide-y divide-gray-500"
      onSubmit={handleSubmit}
    >
      {/* header */}
      <div className="flex h-[50px] items-center !justify-between px-4">
        <Button
          className="cursor-pointer flex items-center"
          onClick={() => setFiles([])}
        >
          <ArrowLeftIcon className="h-5 w-5 text-white hover:text-gray-300" />
        </Button>

        <p className="text-base font-semibold text-white">Crop</p>
        <button
          className="text-primary-500 hover:text-primary-300 cursor-pointer"
          type="submit"
        >
          Share
        </button>
      </div>
      {/* content */}
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-wrap flex-row gap-5 w-2/5 justify-center p-4">
          {thumbs}
        </div>
        <CaptionEditor
          files={files}
          caption={caption}
          setCaption={setCaption}
          altTexts={altTexts}
          setAltTexts={setAltTexts}
        />
      </div>
    </form>
  );
};

interface CaptionEditorProps {
  files: File[];
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
  altTexts: AltTextState[];
  setAltTexts: React.Dispatch<React.SetStateAction<AltTextState[]>>;
}

const CaptionEditor: React.FC<CaptionEditorProps> = ({
  files,
  caption,
  setCaption,
  altTexts,
  setAltTexts,
}) => {
  if (!files) {
    return null;
  }

  const renderFileList = (
    <ul>
      {files.map((f) => (
        <FileItem
          file={f}
          key={f.name}
          altTexts={altTexts}
          setAltTexts={setAltTexts}
        />
      ))}
    </ul>
  );

  return (
    <div className="w-3/5 overflow-y-auto p-4">
      <div className="flex gap-1 items-center pb-[14px]">
        <p className="text-white text-sm">mihomihouk</p>
      </div>
      <TextArea
        placeholder="Write a caption..."
        cols={10}
        className="bg-transparent p-2 max-h-[200px] text-gray-400"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <WordCounter value={caption} className="flex justify-end" />
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
  file: File;
  altTexts: AltTextState[];
  setAltTexts: React.Dispatch<React.SetStateAction<AltTextState[]>>;
}
const FileItem: React.FC<fileItemProps> = ({ file, altTexts, setAltTexts }) => {
  const handleAltTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAltTexts((prevAltTexts) =>
      prevAltTexts.map((altText) =>
        altText.fileName === file.name
          ? { ...altText, altText: event.target.value }
          : altText
      )
    );
  };
  const alt = altTexts.find(
    (altText) => altText.fileName === file.name
  )?.altText;

  return (
    <li className="flex gap-2 align-items max-h-[300px] py-2">
      <img src={URL.createObjectURL(file)} alt="" className="w-[50px]" />
      <input
        placeholder="Write alt text..."
        className="bg-transparent max-w-[120px] p-1 text-gray-400"
        value={alt}
        onChange={handleAltTextChange}
      />
    </li>
  );
};
