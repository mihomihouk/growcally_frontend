import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "../components/button";
import { Post } from "../interface/post";

const mockData: Post[] = [
  {
    id: "asb",
    author: "mihomihouk",
    createdAt: "2d",
    likes: 200,
    description: "Got my job at XYZ company!!!",
  },
  {
    id: "vvv",
    author: "mihomihouk",
    createdAt: "2d",
    likes: 200,
    description: "Got my job at XYZ company!!!",
  },
  {
    id: "akfa",
    author: "mihomihouk",
    createdAt: "2d",
    likes: 200,
    description: "Got my job at XYZ company!!!",
  },
];

export const PostList: React.FC = () => {
  const renderPostItems = mockData.map((i) => {
    return (
      <PostItem
        key={i.id}
        id={i.id}
        author={i.author}
        description={i.description}
        createdAt={i.createdAt}
        likes={i.likes}
      />
    );
  });

  return <div>{renderPostItems}</div>;
};

const PostItem: React.FC<Post> = ({
  id,
  author,
  description,
  createdAt,
  likes,
}) => {
  return (
    <article className="mb-3 pb-5 border-b border-solid border-[#262626]">
      {/* header */}
      <div>
        {/* Avatar */}
        <p>{author}</p>
        <p>{createdAt}</p>
      </div>

      {/* image */}
      {/* <img /> */}

      {/* content */}
      <div>
        {/* actions */}
        <div className="flex gap-2 ">
          <Button>
            <HeartIcon className="h-6 w-6" />
          </Button>
          <Button>
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          </Button>
          <Button>
            <PaperAirplaneIcon className="h-6 w-6" />
          </Button>
        </div>

        {/* likes */}
        <p>{likes} likes</p>
        <p>{description}</p>
      </div>
    </article>
  );
};
