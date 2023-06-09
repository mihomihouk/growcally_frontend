import {
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from '../components/button';
import { TextArea } from '../components/textarea';
import { Comment, MediaFile } from '../interfaces/post';
import { pluralize } from '../util/string';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
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
import { resetModal, showModal } from '../slices/modals-slice';
import { User } from '../interfaces/user';
import { LeafFill } from '../icons/leaf-fill';
import { LeafNoFillBlack } from '../icons/leaf-no-fill-black';
import { MainLoader } from '../components/main-loader';
import { Thumbnail } from '../components/thumbnail';

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
    return <MainLoader />;
  }
  if (!posts.length) {
    return <NoPostsMessage />;
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
  profileImageUrl?: string;
}
export const PostItem: React.FC<PostItemProps> = ({
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

  const isAuthor = currentUser?.posts?.includes(id);
  const hasLiked = currentUser?.likedPosts?.includes(id);

  const mediaUrl = primaryFile?.portraitFileUrl?.split('?')[0];
  const formattedDate = formatDistanceToNow(new Date(createdAt));
  const authorName = `${author.givenName} ${author.familyName}`;
  const ThumbnailSrc =
    author.profileImage?.fileUrl ?? '/img/default-profile.jpg';
  const navigate = useNavigate();

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

  const profilePagePath = `/${author.id}`;

  const handleClickAuthor = () => {
    dispatch(resetModal());
    navigate(profilePagePath);
  };

  return (
    <article className="mb-3 mx-auto pb-5 border-b border-solid border-[#262626] flex flex-col w-full gap-[6px] md:w-[430px]">
      <div className="flex gap-4 items-center">
        <Thumbnail
          src={ThumbnailSrc}
          onClick={handleClickAuthor}
          className="cursor-pointer hover:opacity-70"
          alt={`Profile of ${authorName}`}
        />
        <div className="flex">
          <p>{authorName}</p>
          {'・'}
          <p>{formattedDate} ago</p>
        </div>
      </div>

      {mediaUrl && (
        <img
          className="rounded w-[400px] md:w-[430px] h-[768px] cursor-pointer mx-auto"
          alt={primaryFile.alt || primaryFile.fileName}
          src={mediaUrl}
          onClick={handleOpenPostDetail}
        />
      )}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          {isAuthor ? (
            <></>
          ) : (
            <Button
              type="button"
              onClick={handleClickLike}
              isLoading={isLoading}
              className="cursor-pointer hover:opacity-70"
              aria-label={hasLiked ? 'liked' : 'like'}
            >
              {hasLiked ? <LeafFill /> : <LeafNoFillBlack />}
            </Button>
          )}
          <Button
            type="button"
            className="cursor-pointer hover:opacity-70"
            onClick={handleOpenPostDetail}
          >
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          </Button>
        </div>
        {totalLikes ? (
          <p>
            {totalLikes} {pluralize(totalLikes, 'like', 'likes')}
          </p>
        ) : (
          <></>
        )}
        <p>{caption}</p>
        {comments?.length ? (
          <Button
            type="button"
            testId="view comments"
            onClick={handleOpenPostDetail}
          >
            View {comments.length} {pluralize(comments.length, 'comment')}
          </Button>
        ) : (
          <></>
        )}

        <form className="flex gap-4" onSubmit={handleSubmitComment}>
          <TextArea
            name="comment"
            placeholder="Add a comment"
            aria-label="Add a comment"
            className="max-h-10 p-1 text-sm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            type="submit"
            testId="submit button"
            isLoading={isLoading}
            disabled={!comment}
          >
            <PaperAirplaneIcon className="h-6 w-6 text-black -rotate-45 hover:opacity-70" />
          </Button>
        </form>
      </div>
    </article>
  );
};

const NoPostsMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-4">No posts yet</h3>
        <p className="text-lg mb-6">Create a new post to get started.</p>
        <Button
          type="button"
          isPrimary
          onClick={() =>
            dispatch(showModal({ modalType: ModalType.CreatePost }))
          }
        >
          Create Post
        </Button>
      </div>
    </div>
  );
};
