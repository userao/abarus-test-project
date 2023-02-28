import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { IPost } from "../types/postsTypes";

const postsAdapter = createEntityAdapter<IPost>();
const initialState = postsAdapter.getInitialState();

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: postsAdapter.addMany,
  }
});

export const { actions } = postsSlice;
export default postsSlice.reducer;
