import React from "react";
import { PostList } from "./post-list";

export const Feed = () => {
  return (
    <div className="sm:ml-[200px] md:ml-[200px] pt-10 px-[146px] w-full">
      <PostList />
    </div>
  );
};
