import React, { CSSProperties } from 'react';
import { Button } from '../components/button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';
import { fetchUserDetail } from '../api/auth.service';
import { PropagateLoader } from 'react-spinners';
import { useAppSelector } from '../hooks/hooks';
import { Post } from '../interfaces/post';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

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
  }, [userId]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center">
        <PropagateLoader
          size={30}
          cssOverride={override}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  const fullName = `${profileUser?.givenName} ${profileUser?.familyName}`;
  const postCount = profileUserPosts.length;

  return (
    <div className="flex flex-col max-h-screen overflow-y-auto">
      <div className="flex w-full mb-12">
        <div className="w-1/3 mx-auto">thumbnail</div>
        <div className="w-2/3">
          <div className="flex gap-4">
            <p className="text-xl">{fullName}</p>
            <Button type="button" onClick={setEditor}>
              <PencilSquareIcon className="h-5 w-5" />
            </Button>
          </div>
          <p>{postCount}</p>
          <p>description</p>
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
    <div className="h-full flex columns-2">
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

  return (
    <div className="">
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
