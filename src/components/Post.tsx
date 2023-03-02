import React, { ReactElement } from "react";
import { IPost } from '../types/postsTypes';

interface IPostProps {
  post: IPost,
}

const Post: React.FC<IPostProps> = ({ post }): ReactElement => {
  const { id, title, body } = post;
  return (
    <>
      <div className="posts__item posts__item-id"><p>{id}</p></div>  
      <div className="posts__item posts__item-title"><p>{title}</p></div>  
      <div className="posts__item posts__item-body"><p>{body}</p></div>  
    </>
  );
};

export default Post;
