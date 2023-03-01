import React, { ReactElement } from "react";
import { IPost } from '../types/postsTypes';

interface IPostProps {
  post: IPost,
}

const Post: React.FC<IPostProps> = ({ post }): ReactElement => {
  const { id, title, body } = post;
  return (
    <>
      <div className="posts__item posts__item-id">{id}</div>  
      <div className="posts__item posts__item-title">{title}</div>  
      <div className="posts__item posts__item-body">{body}</div>  
    </>
  );
};

export default Post;
