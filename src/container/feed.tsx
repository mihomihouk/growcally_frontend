import React from 'react';
import { PostList } from './post-list';

export const Feed = () => {
  return (
    <div className="sm:ml-16 md:!ml-64 pt-10 px-2 md:px-12 lg:px-36 w-full">
      <PostList />
    </div>
  );
};
