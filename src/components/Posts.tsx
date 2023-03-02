import React, { ReactElement, useEffect, useState } from "react";
import Post from "./Post";
import { setSortedColumn } from "../slices/PostsSlice";
import "../styles/posts.css";
import { IPost } from "../types/postsTypes";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Posts: React.FC = (): ReactElement => {
  const { normalizedPosts, postsPerPage, currentPage } = useAppSelector((state) => state.posts);
  const [shownPosts, setShownPosts] = useState<IPost[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const firstPostIndex = (currentPage - 1) * postsPerPage;
    const posts = normalizedPosts.filter((post, i) => {
      if (i >= firstPostIndex && i < firstPostIndex + postsPerPage) {
        return true;
      }
      return false;
    });
    setShownPosts(posts);
  }, [currentPage, postsPerPage, setShownPosts, normalizedPosts])
  
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const columnName = e.currentTarget.name;
    dispatch(setSortedColumn(columnName));
  }

  return (
    <div className="posts">
      <div className="posts__header">ID<button className="sort-button" name="id" onClick={handleClick}>+</button></div>
      <div className="posts__header">Заголовок<button className="sort-button" name="title" onClick={handleClick}>+</button></div>
      <div className="posts__header">Описание<button className="sort-button" name="body" onClick={handleClick}>+</button></div>
      {shownPosts.map((post) => {
        if (post) {
          return <Post key={post.id} post={post} />;
        }
        return null;
      })}
    </div>
  );
};

export default Posts;
