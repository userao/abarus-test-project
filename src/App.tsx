import React, { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import { fetchPosts, setNormalizedPosts, setCurrentPage } from "./slices/PostsSlice";
import { IPost } from "./types/postsTypes";
import { useAppDispatch, useAppSelector } from "./app/hooks";

function searchPosts(posts: IPost[], filter: string): IPost[] {
  if (filter === "") return posts;
  return posts.filter((post) => {
    if (
      post.body.includes(filter) ||
      post.title.includes(filter) ||
      post.id.toString().includes(filter)
    ) {
      return true;
    }
    return false;
  });
}

function sortPosts(posts: IPost[], sortedColumn: string, isAsc: boolean) {
  const sortedPosts = [...posts];
  sortedPosts.sort((firstPost, secondPost) => {
    const firstVal: unknown = firstPost[sortedColumn as keyof IPost];
    const secondVal: unknown = secondPost[sortedColumn as keyof IPost];
    
    if (typeof firstVal === 'number' && typeof secondVal === 'number') {
      return firstVal - secondVal;
    } else if (typeof firstVal === 'string' && typeof secondVal === 'string'){
      return firstVal.localeCompare(secondVal);
    }

    return 0;
  });

  return isAsc ? sortedPosts : sortedPosts.reverse();
}

function App() {
  const dispatch = useAppDispatch();
  const { allPosts, searchParam, sortedColumn, isSortedByAsc } = useAppSelector((state) => state.posts);
  
  useEffect(() => {
    const foundPosts = searchPosts(allPosts, searchParam);
    const foundPostsSorted = sortPosts(foundPosts, sortedColumn, isSortedByAsc);
    dispatch(setNormalizedPosts(foundPostsSorted));
    dispatch(setCurrentPage(1));
  }, [searchParam, dispatch, allPosts, sortedColumn, isSortedByAsc]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])



  return (
    <div className="container">
      <SearchBar />
      <Posts />
      <Pagination />
    </div>
  );
}

export default App;
