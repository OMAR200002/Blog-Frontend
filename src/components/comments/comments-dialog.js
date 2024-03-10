import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { commentActions } from "@/lib/store/comment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/lib/api/http-post";
import { Bounce, toast } from "react-toastify";
import { postActions } from "@/lib/store/post";
import { createComment } from "@/lib/api/http-comment";

export default function CommentsDialog() {
  const isOpen = useSelector((state) => state.comment.isDialogOpen);
  const postId = useSelector((state) => state.post.postId);
  const userId = useSelector((state) => state.auth.userInfo?.userId);
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createComment,
    onSuccess: async (data) => {
      dispatch(commentActions.addNewComment(data));
    },
    onError: (error) => {},
  });

  useEffect(() => {
    // Debounced function for handling searchTerm change
    const debounce = setTimeout(() => {
      dispatch(commentActions.updateNewComment(newComment));
    }, 1000);

    // Clear the timeout on every searchTerm change
    return () => clearTimeout(debounce);
  }, [newComment]); // Re-run effect whenever searchTerm changes

  const handleClose = () => {
    dispatch(commentActions.closeCommentDialog());
  };

  const AddNewCommentHandler = () => {
    dispatch(commentActions.closeCommentDialog());
    mutate({
      id: 0,
      content: newComment,
      datePosted: new Date(),
      postId: parseInt(postId),
      authorId: userId,
    });
    setNewComment("");
  };
  const newCommentChangeHandler = (e) => {
    setNewComment(e.target.value);
  };
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            handleClose();
          },
        }}
      >
        <DialogTitle>Add new comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="newComment"
            label="New comment"
            type="text"
            fullWidth
            variant="standard"
            value={newComment}
            onChange={newCommentChangeHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="button" onClick={AddNewCommentHandler}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
