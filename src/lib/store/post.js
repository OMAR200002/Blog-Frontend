import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0, // Steps: [Article info,Article content,Publish Article]
  post: {
    id: 0,
    date: null,
    title: "",
    description: "",
    tags: [],
    imageUrl: null,
    content: "",
  },
  errorCreatePost: null,
  posts: [],
  postId: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.activeStep < 2) state.activeStep += 1;
    },
    prevStep: (state) => {
      if (state.activeStep > 0) state.activeStep -= 1;
    },
    AddPostInfo: (state, action) => {
      if (action.payload === null) {
        state.post = initialState.post;
        state.activeStep = 0;
        return;
      }
      action.payload.tags = state.post.tags;
      action.payload.content = state.post.content;
      action.payload.date = new Date();
      state.post = action.payload;
    },
    updatePostTags: (state, action) => {
      state.post.tags = action.payload;
    },
    AddNewTags: (state, action) => {
      state.post.tags = [...state.post.tags, ...action.payload];
    },
    updatePostContent: (state, action) => {
      const content = action.payload;
      state.post = { ...state.post, content };
    },
    updateActiveStep: (state, action) => {
      state.activeStep = action.payload?.activeStep;
    },
    updateErrorCreatPost: (state, action) => {
      state.errorCreatePost = action.payload.error;
    },
    updatePostId: (state, action) => {
      state.postId = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
