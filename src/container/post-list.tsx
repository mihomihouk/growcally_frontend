import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import React, { CSSProperties } from 'react';
import { Button } from '../components/button';
import { TextArea } from '../components/textarea';
import { Post } from '../interfaces/post';
import { pluralize } from '../util/string';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchPosts } from '../slices/posts-slice';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropagateLoader from 'react-spinners/PropagateLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

export const PostList: React.FC = () => {
  const dispatch = useAppDispatch();
  const postsState = useAppSelector((state) => state.posts);
  const postStatus = postsState.status;

  const isLoading = postStatus === 'loading';

  React.useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

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
  if (!postsState.posts) {
    return <div>Create a new post</div>;
  }
  const renderPostItems = postsState.posts?.map((i) => {
    return (
      <PostItem
        key={i.id}
        id={i.id}
        files={i.files}
        author={i.author}
        caption={i.caption}
        createdAt={i.createdAt}
        likes={i.likes}
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

const PostItem: React.FC<Post> = ({
  id,
  author,
  caption,
  createdAt,
  files,
  likes,
  comments
}) => {
  const [textAreaInput, setTextAreaInput] = React.useState('');
  const primaryFile = files ? files[0] : null;

  const mediaUrl = primaryFile?.fileUrl?.split('?')[0];

  const formattedDate = formatDistanceToNow(new Date(createdAt));
  return (
    <article className="mb-3 pb-5 border-b border-solid border-[#262626] flex flex-col gap-[6px] w-[430px]">
      {/* header */}
      <div className="flex">
        {/* Avatar */}
        <p>{author}</p>
        {'・'}
        <p>{formattedDate}</p>
      </div>

      {/* image */}
      {mediaUrl && (
        <img
          className="rounded w-[430px] h-[768px]"
          alt={primaryFile.alt || ''}
          src={mediaUrl}
        ></img>
      )}
      {/* content */}
      <div className="flex flex-col gap-2">
        {/* actions */}
        <div className="flex gap-2 ">
          <Button type="button">
            <HeartIcon className="h-6 w-6" />
          </Button>
          <Button type="button">
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          </Button>
          <Button type="button">
            <PaperAirplaneIcon className="h-6 w-6" />
          </Button>
        </div>

        {/* likes */}
        <p>{likes} likes</p>
        <p>{caption}</p>
        {comments?.length && (
          <Button type="button">
            View all {comments.length} {pluralize(comments.length, 'comment')}
          </Button>
        )}
        <TextArea
          name="comment"
          placeholder="Add a comment"
          className="max-h-10 p-1 text-sm"
          value={textAreaInput}
          onChange={(e) => setTextAreaInput(e.target.value)}
        />
      </div>
    </article>
  );
};
