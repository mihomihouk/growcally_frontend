import React from "react";
import { PostList } from "./post-list";

export const Feed = () => {
  return (
    <div className="sm:w-2/3 md:w-5/6 pt-10 px-[146px]">
      <PostList />
    </div>
  );
};
