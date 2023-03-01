import React, { ReactElement, useEffect, useState } from "react";
import Post from "./Post";
import "../styles/posts.css";
import { IPost } from "../types/postsTypes";
import { useAppSelector } from "../app/hooks";
import { postsSelectors } from "../slices/PostsSlice";
import axios from "axios";
import routes from "../routes";

interface IPostsProps {
  page: number;
  postsPerPage: number;
}

const Posts: React.FC<IPostsProps> = ({ page, postsPerPage }): ReactElement => {
  //   const firstPostIndex = (page - 1) * postsPerPage;
  //   const [shownPosts, setShownPosts] = useState<IPost[]>([]);

  //   useEffect(() => {
  //     async function fetchPageOfPosts(from: number, numberOfPosts: number) {
  //       return await axios.get(`${routes.getPosts()}?_start=${from}&_limit=${numberOfPosts}`);
  //     }

  //     fetchPageOfPosts(firstPostIndex, postsPerPage)
  //       .then(({ data }) => {
  //         setShownPosts(data);
  //       });
  //   }, [page, firstPostIndex, postsPerPage]);

  const allPosts = useAppSelector((state) => postsSelectors.selectAll(state));
  const { searchBy } = useAppSelector((state) => state.posts);
  const searchResult = allPosts.filter((post) => {
    if (searchBy === "") {
      return true;
    }
    if (
      post.body.includes(searchBy) ||
      post.title.includes(searchBy) ||
      post.id.toString().includes(searchBy)
    ) {
      return true;
    }
    return false;
  });
  const firstPostIndex = (page - 1) * postsPerPage;
  const [shownPosts, setShownPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const postsOnPage = allPosts.filter((p, i) => {
      if (i >= firstPostIndex && i < firstPostIndex + 10) {
        return true;
      }

      return false;
    });
    setShownPosts(postsOnPage);
  }, [setShownPosts, page, postsPerPage, allPosts, firstPostIndex]);

  return (
    <div className="posts">
      <div className="posts__header">ID</div>
      <div className="posts__header">Заголовок</div>
      <div className="posts__header">Описание</div>
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
