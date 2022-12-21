import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type Post = {
  body: string,
  id: number,
  title: string,
  userId: number,
};

type Posts = {
  posts: Post[],
  loading: boolean,
  error: string | null,
  deletedPostIds: number[];
};

const initialState: Posts = {
  posts: [],
  loading: false,
  error: null,
  deletedPostIds: [],
};

export const getPosts = createAsyncThunk<Post[], undefined, { rejectValue: string }>(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log(res.data);

    if (res.status !== 200) {
      return rejectWithValue('Server error');
    }

    return res.data;
  }
);

export const deletePost = createAsyncThunk<number, number, { rejectValue: string }>(
  'posts/deletePost',
  async (id: number, { rejectWithValue }) => {
    const res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (res.status !== 200) {
      rejectWithValue('Delete error');
    }

    return id;
  },
);

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.deletedPostIds.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        state.loading = false;
        state.deletedPostIds.shift();
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export const { setLoader } = postSlice.actions;
export default postSlice.reducer;

