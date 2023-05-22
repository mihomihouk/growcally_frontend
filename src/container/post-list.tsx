import {
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import React, { CSSProperties } from 'react';
import { Button } from '../components/button';
import { TextArea } from '../components/textarea';
import { Comment, MediaFile } from '../interfaces/post';
import { pluralize } from '../util/string';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { useNavigate } from 'react-router-dom';
import { LOG_IN_PATH } from '../routes/routes';
import {
  createComment,
  getAllPosts,
  likePost,
  unlikePost
} from '../api/media.service';
import { setCurrentPost, updatePosts } from '../slices/posts-slice';
import { ModalType } from '../interfaces/modal-type';
import { showModal } from '../slices/modals-slice';
import { User } from '../interfaces/user';
import { LeafFill } from '../icons/leaf-fill';
import { LeafNoFillBlack } from '../icons/leaf-no-fill-black';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

export const PostList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (user) {
          const { data, alertMessage, isSuccess } = await getAllPosts(user.id);
          if (!isSuccess) {
            if (alertMessage === 'Unauthorised') {
              navigate(LOG_IN_PATH);
            }
            alert(alertMessage);
            setIsLoading(false);
            return;
          }
          dispatch(updatePosts(data));
        } else {
          navigate(LOG_IN_PATH);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert('We failed to get information of posts.');
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center">
        <PropagateLoader
          size={30}
          color={'#42cc8c'}
          cssOverride={override}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }
  if (!posts.length) {
    return <div>Create a new post</div>;
  }
  const renderPostItems = posts?.map((i) => {
    return (
      <PostItem
        key={i.id}
        id={i.id}
        files={i.files}
        author={i.author}
        caption={i.caption}
        createdAt={i.createdAt}
        totalLikes={i.totalLikes}
        comments={i.comments}
      />
    );
  });

  return (
    <>
      <div data-testid="posts-list">{renderPostItems}</div>
    </>
  );
};

interface PostItemProps {
  id: string;
  author: User;
  caption: string;
  createdAt: string;
  files: MediaFile[];
  totalLikes: number;
  comments?: Comment[];
}
const PostItem: React.FC<PostItemProps> = ({
  id,
  author,
  caption,
  createdAt,
  files,
  totalLikes,
  comments
}) => {
  const [comment, setComment] = React.useState('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const userId = currentUser?.id;
  const primaryFile = files ? files[0] : null;

  const mediaUrl = primaryFile?.fileUrl?.split('?')[0];

  const formattedDate = formatDistanceToNow(new Date(createdAt));

  const authorName = `${author.givenName} ${author.familyName}`;

  const handleClickLike = async () => {
    if (!userId) {
      return;
    }
    setIsLoading(true);
    if (hasLiked) {
      const { isSuccess, alertMessage } = await unlikePost({
        userId,
        postId: id
      });
      if (!isSuccess) {
        setIsLoading(false);
        alert(alertMessage);
        return;
      }
    } else {
      const { isSuccess, alertMessage } = await likePost({
        userId,
        postId: id
      });
      if (!isSuccess) {
        setIsLoading(false);
        alert(alertMessage);
        return;
      }
    }
    setIsLoading(false);
  };

  const handleOpenPostDetail = () => {
    dispatch(showModal({ modalType: ModalType.PostDetail }));
    dispatch(setCurrentPost(id));
  };
  const hasLiked = currentUser?.likedPosts?.includes(id);

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      return;
    }
    setIsLoading(true);
    const { isSuccess, alertMessage } = await createComment({
      userId: currentUser.id,
      postId: id,
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

  return (
    <article className="mb-3 pb-5 border-b border-solid border-[#262626] flex flex-col gap-[6px] w-[430px]">
      {/* header */}
      <div className="flex">
        {/* Avatar */}
        <p>{authorName}</p>
        {'・'}
        <p>{formattedDate} ago</p>
      </div>

      {/* image */}
      {mediaUrl && (
        <img
          className="rounded w-[430px] h-[768px]"
          alt={primaryFile.alt || ''}
          src={mediaUrl}
        />
      )}
      {/* content */}
      <div className="flex flex-col gap-2">
        {/* actions */}
        <div className="flex gap-2 items-center">
          <Button type="button" onClick={handleClickLike} isLoading={isLoading}>
            {hasLiked ? <LeafFill /> : <LeafNoFillBlack />}
          </Button>
          <Button type="button" onClick={handleOpenPostDetail}>
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          </Button>
        </div>

        <p>{totalLikes} likes</p>
        <p>{caption}</p>
        {comments?.length && (
          <Button type="button" onClick={handleOpenPostDetail}>
            View all {comments.length} {pluralize(comments.length, 'comment')}
          </Button>
        )}

        <form className="flex gap-4" onSubmit={handleSubmitComment}>
          <TextArea
            name="comment"
            placeholder="Add a comment"
            className="max-h-10 p-1 text-sm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" isLoading={isLoading} disabled={!comment}>
            <PaperAirplaneIcon className="h-6 w-6 text-black -rotate-45 hover:opacity-70" />
          </Button>
        </form>
      </div>
    </article>
  );
};
