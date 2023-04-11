import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "../components/button";
import { TextArea } from "../components/textarea";
import { Post } from "../interfaces/post";
import { pluralize } from "../util/string";

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
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading....</p>;
  }
  const renderPostItems = mockData.map((i) => {
    return (
      <PostItem
        key={i.id}
        id={i.id}
        author={i.author}
        description={i.description}
        createdAt={i.createdAt}
        likes={i.likes}
        comments={i.comments}
      />
    );
  });

  return (
    <>
      <div>{renderPostItems}</div>;
    </>
  );
};

const PostItem: React.FC<Post> = ({
  id,
  author,
  description,
  createdAt,
  likes,
  comments,
}) => {
  const [textAreaInput, setTextAreaInput] = React.useState("");
  return (
    <article className="mb-3 pb-5 border-b border-solid border-[#262626]">
      {/* header */}
      <div className="flex">
        {/* Avatar */}
        <p>{author}</p>
        {"・"}
        <p>{createdAt}</p>
      </div>

      {/* image */}
      {/* <img /> */}

      {/* content */}
      <div className="flex flex-col gap-2">
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
        {comments?.length && (
          <Button>
            View all {comments.length} {pluralize(comments.length, "comment")}
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
