import React, { ReactElement, useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import Post from "./Post";
import { setSortedColumn } from "../slices/PostsSlice";
import "../styles/posts.css";
import { IPost } from "../types/postsTypes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import BlankLine from "./BlankLine";

const Posts: React.FC = (): ReactElement => {
  const { normalizedPosts, postsPerPage, currentPage, isSortedByAsc, sortedColumn } =
    useAppSelector((state) => state.posts);
  const [shownPosts, setShownPosts] = useState<IPost[]>([]);
  const dispatch = useAppDispatch();
  const numberOfEmptyLines = 10 - shownPosts.length;
  const emptyLines = [];
  for (let i = 0; i < numberOfEmptyLines; i += 1) {
    emptyLines.push(<BlankLine key={i} />);
  }


  useEffect(() => {
    const firstPostIndex = (currentPage - 1) * postsPerPage;
    const posts = normalizedPosts.filter((post, i) => {
      if (i >= firstPostIndex && i < firstPostIndex + postsPerPage) {
        return true;
      }
      return false;
    });
    setShownPosts(posts);
  }, [currentPage, postsPerPage, setShownPosts, normalizedPosts]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const columnName = e.currentTarget.name;
    dispatch(setSortedColumn(columnName));
  }

  return (
    <div className="posts">
      <button className="posts__header" name="id" onClick={handleClick}>
        <span>ID</span>
        {sortedColumn === "id" && !isSortedByAsc ? (
          <ChevronUp className={"chevron"} size={14} color="white" />
        ) : (
          <ChevronDown className={"chevron"} size={14} color="white" />
        )}
      </button>
      <button className="posts__header" name="title" onClick={handleClick}>
        <span>Заголовок</span>
        {sortedColumn === "title" && !isSortedByAsc ? (
          <ChevronUp className={"chevron"} size={14} color="white" />
        ) : (
          <ChevronDown className={"chevron"} size={14} color="white" />
        )}
      </button>
      <button className="posts__header" name="body" onClick={handleClick}>
        <span>Описание</span>
        {sortedColumn === "body" && !isSortedByAsc ? (
          <ChevronUp className={"chevron"} size={14} color="white" />
        ) : (
          <ChevronDown className={"chevron"} size={14} color="white" />
        )}
      </button>
      {shownPosts.map((post) => {
        if (post) {
          return <Post key={post.id} post={post} />;
        }
        return null;
      })}
      {numberOfEmptyLines && emptyLines};
    </div>
  );
};

export default Posts;
