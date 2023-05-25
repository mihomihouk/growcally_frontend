import { Modal } from '../components/modal';
import React from 'react';
import { MediaFile, Post, Comment } from '../interfaces/post';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Button } from '../components/button';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { hideModal, resetModal, showModal } from '../slices/modals-slice';
import { ModalType } from '../interfaces/modal-type';
import { setCurrentPost } from '../slices/posts-slice';
import { formatDistanceToNow } from 'date-fns';
import { TextArea } from '../components/textarea';
import { createComment } from '../api/media.service';
import { useNavigate } from 'react-router-dom';
import { Thumbnail } from '../components/thumbnail';

export const PostDetailModal: React.FC = () => {
  const currentPost = useAppSelector((state) => state.posts.currentPost);
  const dispatch = useAppDispatch();
  if (!currentPost) {
    return <></>;
  }
  const handleDismissModal = () => {
    dispatch(hideModal({ modalType: ModalType.AccountAction }));
    dispatch(setCurrentPost(undefined));
  };

  return (
    <Modal onDismiss={handleDismissModal} className="!w-[900px]">
      <PostDetailModalContainer post={currentPost} />
    </Modal>
  );
};
interface PostDetailModalContainerProps {
  post: Post;
}

export const PostDetailModalContainer: React.FC<
  PostDetailModalContainerProps
> = ({ post }) => {
  const [currentFileIndex, setCurrentFileIndex] = React.useState<number>(0);
  const filesLength = post.files.length;

  const handleClickForward = () => {
    setCurrentFileIndex((prevIndex) => (prevIndex + 1) % filesLength);
  };

  const handleClickBackward = () => {
    setCurrentFileIndex(
      (prevIndex) => (prevIndex - 1 + filesLength) % filesLength
    );
  };

  const currentFile = post.files[currentFileIndex];

  return (
    <div className="flex h-full w-full">
      <div className="w-3/5 overflow-hidden relative h-full">
        <PostImageItem
          imageItem={currentFile}
          onClickForward={handleClickForward}
          onClickBackward={handleClickBackward}
        />
      </div>
      <div className="w-2/5 overflow-y-auto flex flex-col h-full">
        <CommentForm post={post} />
      </div>
    </div>
  );
};

interface PostImageItemProps {
  imageItem: MediaFile;
  onClickForward: () => void;
  onClickBackward: () => void;
}

export const PostImageItem: React.FC<PostImageItemProps> = ({
  imageItem,
  onClickForward,
  onClickBackward
}) => {
  return (
    <>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button type="button" onClick={onClickBackward}>
          <ChevronDoubleLeftIcon className="h-6 w-6 text-white hover:opacity-70" />
        </Button>
        <Button type="button" className="" onClick={onClickForward}>
          <ChevronDoubleRightIcon className="h-6 w-6 text-white hover:opacity-70" />
        </Button>
      </div>

      <img
        alt={imageItem.alt}
        src={imageItem.fileUrl}
        className="h-full w-full object-contain"
      />
    </>
  );
};

interface CommentFormProps {
  post: Post;
}

export const CommentForm: React.FC<CommentFormProps> = ({ post }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [comment, setComment] = React.useState<string>('');
  const formattedDate = formatDistanceToNow(new Date(post.createdAt));
  const { comments } = post;
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCurrentUserPost = post.author.id === currentUser?.id;

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      return;
    }
    setIsLoading(true);
    const { isSuccess, alertMessage } = await createComment({
      userId: currentUser.id,
      postId: post.id,
      text: comment
    });
    if (!isSuccess) {
      alert(alertMessage);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setComment('');
  };

  const handleClickDelete = () => {
    dispatch(showModal({ modalType: ModalType.DeletePost }));
  };

  const showComments = comments && comments.length > 0;

  const postAuthorName = `${post.author.givenName} ${post.author.familyName}`;
  const postAuthorThumbnailUrl =
    post.author.profileImage?.fileUrl ?? "'/img/default-profile.png';";
  const profilePagePath = `/${post.author.id}`;

  const handleClickAuthor = () => {
    dispatch(resetModal());
    navigate(profilePagePath);
  };

  return (
    <>
      <div className="p-4 gap-4 flex">
        <Thumbnail
          src={postAuthorThumbnailUrl}
          onClick={handleClickAuthor}
          className="flex-shrink-0 cursor-pointer"
        />
        <div className="flex flex-col flex-grow">
          <div className="flex items-center justify-between">
            <p className="text-white font-medium">{postAuthorName}</p>
            {isCurrentUserPost && (
              <div className="text-white flex gap-4">
                <Button type="button">
                  <PencilSquareIcon className="h-6 w-6 hover:opacity-70" />
                </Button>
                <Button type="button" onClick={handleClickDelete}>
                  <TrashIcon className="h-6 w-6 hover:opacity-70" />
                </Button>
              </div>
            )}
          </div>
          <p className="text-white">{post.caption}</p>
          <p className="text-sm text-gray-500">{formattedDate} ago</p>
        </div>
      </div>
      <hr className="border-t border-gray-300 mr-4" />
      {showComments && (
        <div className="overflow-y-auto">
          {comments.map((comment) => {
            return <CommentItem key={comment.id} comment={comment} />;
          })}
        </div>
      )}

      <form className="flex gap-3 p-4" onSubmit={handleSubmitComment}>
        <TextArea
          placeholder="Add a comment..."
          className="w-full px-1 py-1 rounded-md"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" isLoading={isLoading} disabled={!comment}>
          <PaperAirplaneIcon className="h-6 w-6 text-white -rotate-45 hover:opacity-70" />
        </Button>
      </form>
    </>
  );
};

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const formattedDate = formatDistanceToNow(new Date(comment.updatedAt));
  const commentAuthorName = `${comment.author.givenName} ${comment.author.familyName}`;
  const authorThumbnailUrl =
    comment.author.profileImage?.fileUrl ?? '/img/default-profile.png';
  return (
    <div className="p-4 flex gap-4">
      <Thumbnail src={authorThumbnailUrl} className="shrink-0" />
      <div className="flex-grow">
        <p className="text-white font-medium">{commentAuthorName}</p>
        <p className="text-white">{comment.content}</p>
        <p className="text-sm text-gray-500">{formattedDate} ago</p>
      </div>
    </div>
  );
};
