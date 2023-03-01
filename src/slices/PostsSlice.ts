import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IPost } from "../types/postsTypes";

// const fetchPosts = createAsyncThunk(
//   'posts/fetchPosts',
//   async () => {
//     const response = await userAPI.fetchById(userId)
//     return response.data
//   }
// )

const postsAdapter = createEntityAdapter<IPost>();

const initialState = {
  currentPage: 1,
  postsPerPage: 10,
  totalCount: 0,
  searchBy: "",
  ...postsAdapter.getInitialState(),
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: postsAdapter.addMany,
    setTotalCount: (state, { payload }) => {
      state.totalCount = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setSearchBy: (state, { payload }) => {
      state.searchBy = payload;
    },
  },
});

export const postsSelectors = postsAdapter.getSelectors((state: RootState) => state.posts);
export const { actions } = postsSlice;
export default postsSlice.reducer;
