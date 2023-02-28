import React, { ReactElement } from "react";
import { useAppSelector } from "../app/hooks";
import Post from "./Post";
import '../styles/posts.css';

const Posts: React.FC = (): ReactElement => {
  const { ids, entities } = useAppSelector(state => state.posts);
  const posts = ids.map(id => entities[id]);

  return (
    <div className="posts">
      <div className="posts__header">ID</div>
      <div className="posts__header">Заголовок</div>
      <div className="posts__header">Описание</div>
      {posts.map(post => {
        if (post) {
          return <Post key={post.id} post={post} />
        }
        return null;
      })}
    </div>
  )
};

export default Posts;
