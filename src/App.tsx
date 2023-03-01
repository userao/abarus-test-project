import React, { useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import { actions, postsSelectors } from './slices/PostsSlice';
import { IPost } from './types/postsTypes';
import { useAppDispatch, useAppSelector } from './app/hooks';
import routes from "./routes";

function App() {
  const dispatch = useAppDispatch();
//   const allPosts = useAppSelector(state => postsSelectors.selectAll(state));
  const { currentPage, postsPerPage } = useAppSelector((state) => state.posts);

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get<IPost[]>(routes.getPosts());
      return response;
    }

    fetchPosts().then((response) => {
      dispatch(actions.addPosts(response.data));
      dispatch(actions.setTotalCount(response.data.length));
    });
  }, []);

  return (
    <div className="container">
      <SearchBar />
      <Posts page={currentPage} postsPerPage={postsPerPage} />
      <Pagination />
    </div>
  );
}

export default App;
