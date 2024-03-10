import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDialogOpen: false,
  newComment: null,
  comments: [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    updateNewComment: (state, action) => {
      state.newComment = action.payload;
    },
    openCommentDialog: (state) => {
      state.isDialogOpen = true;
    },
    closeCommentDialog: (state) => {
      state.isDialogOpen = false;
      state.newComment = "";
    },
    addNewComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
    updateComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const commentActions = commentSlice.actions;
export default commentSlice.reducer;
