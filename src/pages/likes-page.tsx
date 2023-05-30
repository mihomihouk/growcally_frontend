import React from 'react';
import { Layout } from './layout';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchLikedPosts } from '../api/media.service';
import { MainLoader } from '../components/main-loader';
import { Post } from '../interfaces/post';
import { formatDistanceToNow } from 'date-fns';
import { showModal } from '../slices/modals-slice';
import { setCurrentPost } from '../slices/posts-slice';
import { ModalType } from '../interfaces/modal-type';
import { pluralize } from '../util/string';
import { Thumbnail } from '../components/thumbnail';

export const LikesPage = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [likedPosts, setLikedPosts] = React.useState<Post[]>();
  const currentUser = useAppSelector((state) => state.auth.user);

  const getLikedPosts = async () => {
    if (!currentUser) {
      return;
    }
    setIsLoading(true);
    const { data, isSuccess, alertMessage } = await fetchLikedPosts(
      currentUser.id
    );
    if (!isSuccess) {
      alert(alertMessage);
      setIsLoading(false);
      return;
    }
    setLikedPosts(data.likedPosts);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getLikedPosts();
  }, []);

  if (isLoading) {
    return <MainLoader />;
  }
  const mostRecentLike = likedPosts ? likedPosts[0] : null;
  const topImage = mostRecentLike?.files[0];
  const topImageUrl = topImage?.fileUrl?.split('?')[0];
  const topImageAlt = topImage?.alt ?? topImage?.fileName;

  return (
    <Layout>
      <div className="flex gap-4 h-full">
        <div className="w-1/3 rounded-md static">
          {likedPosts ? (
            <div>
              <img alt={topImageAlt} src={topImageUrl} className="rounded-xl" />
            </div>
          ) : (
            <></>
          )}
          <div>
            <p className="text-2xl font-extrabold">Liked posts</p>
            {likedPosts ? (
              <p>
                {likedPosts.length}{' '}
                {pluralize(likedPosts.length, 'post', 'posts')}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-2/3 flex flex-col gap-4 overflow-y-auto mb-[70px]">
          {likedPosts ? (
            likedPosts?.map((likedPost) => (
              <LikedPostItem key={likedPost.id} post={likedPost} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </Layout>
  );
};

interface LikedPostItemProps {
  post: Post;
}
const LikedPostItem: React.FC<LikedPostItemProps> = ({ post }) => {
  const primaryFile = post.files[0];
  const mediaUrl = primaryFile?.fileUrl?.split('?')[0];
  const altText = primaryFile.alt ?? primaryFile.fileName;
  const authorThumbnailUrl =
    post.author.profileImage?.fileUrl?.split('?')[0] ??
    '/img/default-profile.png';
  const authorName = `${post.author.givenName} ${post.author.familyName}`;
  const formattedDate = formatDistanceToNow(new Date(post.updatedAt));
  const dispatch = useAppDispatch();

  const handleClickLikedPost = () => {
    dispatch(showModal({ modalType: ModalType.PostDetail }));
    dispatch(setCurrentPost(post.id));
  };

  return (
    <div
      className="w-full h-52 flex md:flex-row flex-col item-center gap-4 md:p-4 hover:bg-gray-300 rounded-xl cursor-pointer"
      onClick={handleClickLikedPost}
    >
      <img
        alt={altText}
        src={mediaUrl}
        className="w-full rounded-xl md:w-1/3"
      />
      <div className="flex flex-col gap-4 w-full md:w-2/3">
        <div className="item-center flex gap-4 items-center">
          <Thumbnail src={authorThumbnailUrl} />
          <p className="text-lg font-semibold">{authorName}</p>
        </div>
        <div className="flex">
          <p>
            {post.totalLikes} {pluralize(post.totalLikes, 'like', 'likes')}
          </p>
          {'・'}
          <p>{formattedDate} ago</p>
        </div>
        {post.caption ? <p>{post.caption}</p> : <></>}
      </div>
    </div>
  );
};
