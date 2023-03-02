import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../app/store";
import routes from "../routes";
import { IPost } from "../types/postsTypes";

interface IPostsState {
  allPosts: IPost[],
  totalCount: number,
  currentPage: number,
  normalizedPosts: IPost[],
  postsPerPage: number,
  searchParam: string,
  sortedColumn: string,
  isSortedByAsc: boolean,
}

const initialState: IPostsState = {
  allPosts: [],
  totalCount: 0,
  currentPage: 1,
  normalizedPosts: [],
  postsPerPage: 10,
  searchParam: '',
  sortedColumn: 'id',
  isSortedByAsc: true,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts(state, action: PayloadAction<IPost[]>) {
      state.allPosts = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchParam(state, action: PayloadAction<string>) {
      state.searchParam = action.payload;
    },
    setNormalizedPosts(state, action: PayloadAction<IPost[]>) {
      state.normalizedPosts = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setSortedColumn(state, action: PayloadAction<string>) {
      if (action.payload === state.sortedColumn) {
        state.isSortedByAsc = !state.isSortedByAsc;
      } else {
        state.sortedColumn = action.payload;
      }
    },
  }
});

export const fetchPosts = () => async (dispatch: AppDispatch) => {
  axios.get(routes.getPosts()).then((response) => {
    dispatch(postsSlice.actions.addPosts(response.data));
    dispatch(postsSlice.actions.setTotalCount(response.data.length));
  });
};
export const { addPosts, setCurrentPage, setNormalizedPosts, setSearchParam, setSortedColumn } = postsSlice.actions;
export default postsSlice.reducer;