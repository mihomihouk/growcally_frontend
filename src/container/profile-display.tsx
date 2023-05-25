import React from 'react';
import { Button } from '../components/button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import { fetchUserDetail } from '../api/auth.service';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { Post } from '../interfaces/post';
import { showModal } from '../slices/modals-slice';
import { ModalType } from '../interfaces/modal-type';
import { setCurrentPost } from '../slices/posts-slice';
import { MainLoader } from '../components/main-loader';

interface MyProfileProps {
  setEditor: () => void;
}

export const ProfileDisplay: React.FC<MyProfileProps> = ({ setEditor }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { userId } = useParams();
  const currentUser = useAppSelector((state) => state.auth.user);
  const userProfile = useAppSelector((state) => state.userProfile);
  const profileUser = userProfile.user;
  const profileUserPosts = userProfile.posts;

  const getUserDetail = async () => {
    setIsLoading(true);
    if (!userId || !currentUser) {
      alert(
        "Oops! We've failed to get the information. Please refresh the page."
      );
      setIsLoading(false);
      return;
    }

    const { isSuccess, alertMessage } = await fetchUserDetail({
      targetUserId: userId,
      currentUserId: currentUser.id
    });

    if (!isSuccess) {
      alert(alertMessage);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  React.useEffect(() => {
    getUserDetail();
  }, []);

  if (isLoading) {
    return <MainLoader />;
  }

  const fullName = `${profileUser?.givenName} ${profileUser?.familyName}`;
  const postCount = profileUserPosts.length;
  const profileImageUrl = profileUser?.profileImage
    ? profileUser?.profileImage?.fileUrl?.split('?')[0]
    : '/img/default-profile.png';

  return (
    <div className="flex flex-col max-h-screen">
      <div className="flex w-full mb-12 items-center">
        <div className="w-1/3 mx-auto">
          <div className="relative w-24 h-24 rounded-full border-2 border-gray-500">
            <img
              className="rounded-full object-cover w-24 h-24"
              src={profileImageUrl}
              alt="profile"
            />
          </div>
        </div>
        <div className="w-2/3">
          <div className="flex gap-4">
            <p className="text-xl">{fullName}</p>
            <Button type="button" onClick={setEditor}>
              <PencilSquareIcon className="h-5 w-5" />
            </Button>
          </div>
          <p>{postCount}</p>
          {profileUser?.bio && <p>{profileUser?.bio}</p>}
        </div>
      </div>
      <PostList posts={profileUserPosts} />
    </div>
  );
};

interface PostListProps {
  posts?: Post[];
}
const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (!posts) {
    return <p>No post yet</p>;
  }

  return (
    <div className="h-full flex columns-2 overflow-y-auto">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const primaryFile = post.files[0];

  const mediaUrl = primaryFile?.fileUrl?.split('?')[0];

  const dispatch = useAppDispatch();

  const handleOpenPostDetail = () => {
    dispatch(showModal({ modalType: ModalType.PostDetail }));
    dispatch(setCurrentPost(post.id));
  };

  return (
    <div className="cursor-pointer" onClick={handleOpenPostDetail}>
      {mediaUrl && (
        <img
          src={mediaUrl}
          alt={primaryFile.alt}
          className="w-full aspect-square border-4 border-black"
        />
      )}
    </div>
  );
};
