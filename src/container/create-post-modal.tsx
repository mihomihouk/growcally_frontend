import React from 'react';
import { Modal } from '../components/modal';
import { Button } from '../components/button';
import {
  ArrowLeftIcon,
  PhotoIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { hideModal } from '../slices/modals-slice';
import { ModalType } from '../interfaces/modal-type';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import { TextArea } from '../components/textarea';
import { WordCounter } from '../components/word-counter';
import { Accordion } from '../components/accordion';
import { getAllPosts, uploadPost } from '../api/media.service';
import { UploadFile } from '../interfaces/post';
import { updatePosts } from '../slices/posts-slice';

export const CreatePostModal: React.FC = () => {
  const [files, setFiles] = React.useState<UploadFile[]>([]);
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
  files: UploadFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}
const DragAndDrop: React.FC<DragAndDropProps> = ({ setFiles }) => {
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const uploadFiles: UploadFile[] = [];
    for (let index = 0; index < acceptedFiles.length; index++) {
      const newId = acceptedFiles.length + index + 1;
      uploadFiles.push({
        id: newId.toString(),
        file: acceptedFiles[index]
      });
    }
    setFiles(uploadFiles);
  }, []);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({ onDrop, accept: { 'image/*': [] } });

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
            'flex flex-col p-5 ease-in-out duration-75 border-dashed border-primary-500 border-2 text-center cursor-default rounded-2xl',
            {
              '!border-success-500': isDragAccept,
              '!border-error-500': isDragReject
            }
          )}
          {...getRootProps()}
          data-testid="drop-zone"
        >
          <input {...getInputProps()} />
          <PhotoIcon className="h-20 w-20 text-white mx-auto" />
          <p className="text-white text-xl font-normal my-4">
            Drag photos and videos here
          </p>
          <Button type="button" isPrimary>
            Select From Computer
          </Button>
        </div>
      </div>
    </div>
  );
};

interface UploadFormProps {
  files: UploadFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
  onDismiss: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({
  files,
  setFiles,
  onDismiss
}) => {
  const [caption, setCaption] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user)!;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const post = {
      authorId: currentUser.id,
      caption,
      files: files
    };
    const { isSuccess: isUploadSuccess, alertMessage: alertUpload } =
      await uploadPost(post);
    if (!isUploadSuccess) {
      alert(alertUpload);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    const {
      data,
      isSuccess: isFetchSuccess,
      alertMessage: alertFetch
    } = await getAllPosts(currentUser.id);
    if (!isFetchSuccess) {
      alert(alertFetch);
      setIsLoading(false);
      return;
    }
    dispatch(updatePosts(data));
    onDismiss();
  };
  const handleDeleteFile = (fileName: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.file.name !== fileName)
    );
  };
  const thumbs = files.map((file) => (
    <div
      className="relative border-white border-2 h-[200px] w-[200px] p-2"
      key={file.file.name}
    >
      <div className="overflow-hidden min-w-0 flex items-center justify-center h-full">
        <img
          src={URL.createObjectURL(file.file)}
          alt="accepted file"
          className="block"
        />
      </div>
      <Button
        className="absolute top-1"
        type="button"
        onClick={() => handleDeleteFile(file.file.name)}
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
          type="button"
          onClick={() => setFiles([])}
        >
          <ArrowLeftIcon className="h-5 w-5 text-white hover:text-gray-300" />
        </Button>

        <Button
          className="text-primary-500 hover:text-primary-300 cursor-pointer"
          type="submit"
          isLoading={isLoading}
        >
          Share
        </Button>
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
          setFiles={setFiles}
        />
      </div>
    </form>
  );
};

interface CaptionEditorProps {
  files: UploadFile[];
  caption: string;
  setCaption: React.Dispatch<React.SetStateAction<string>>;
  setFiles: React.Dispatch<React.SetStateAction<UploadFile[]>>;
}

const CaptionEditor: React.FC<CaptionEditorProps> = ({
  files,
  caption,
  setCaption,
  setFiles
}) => {
  if (!files) {
    return null;
  }
  const updateFileAltText = (id: string, text: string) => {
    const newListFiles = files.map((f) => {
      if (f.id === id) {
        return { ...f, altText: text };
      }
      return f;
    });
    setFiles(newListFiles);
  };

  const renderFileList = (
    <ul>
      {files.map((f) => (
        <FileItem
          file={f}
          key={f.id}
          altText={f.altText || ''}
          onChangeAltText={updateFileAltText}
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
        name="caption"
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
  file: UploadFile;
  altText: string;
  onChangeAltText: (id: string, language: string) => void;
}
const FileItem: React.FC<fileItemProps> = ({
  file,
  altText,
  onChangeAltText
}) => {
  return (
    <li className="flex gap-2 align-items max-h-[300px] py-2">
      <img src={URL.createObjectURL(file.file)} alt="" className="w-[50px]" />
      <input
        placeholder="Write alt text..."
        className="bg-transparent max-w-[120px] p-1 text-gray-400"
        value={altText}
        onChange={(e) => onChangeAltText(file.id, e.target.value)}
      />
    </li>
  );
};
