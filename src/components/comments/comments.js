import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { commentActions } from "@/lib/store/comment";
import CommentsDialog from "@/components/comments/comments-dialog";
import { useQuery } from "@tanstack/react-query";
import { fetchCommentsByPost } from "@/lib/api/http-comment";
import { useState } from "react";

export default function CommentsList(props) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const comments = useSelector((state) => state.comment.comments);

  const addCommentHandler = (e) => {
    dispatch(commentActions.openCommentDialog());
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["comments", props.postId, comments],
    queryFn: ({ signal }) => fetchCommentsByPost(props.postId),
  });

  if (typeof data !== "undefined") {
    dispatch(commentActions.updateComments(data));
  }

  return (
    <Container maxWidth="lg" sx={{ paddingLeft: "0px !important" }}>
      <Divider sx={{ mb: 2, mt: 2 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="div" sx={{ display: "flex" }}>
          <CommentIcon sx={{ mr: 1, color: "var(--main-color)" }} />
          <Typography sx={{ color: "#504e70" }} cmponent="p">
            Comments
          </Typography>
        </Typography>
        {isAuthenticated && (
          <Typography
            component="a"
            sx={{
              color: "var(--main-color)",
              cursor: "pointer",
            }}
            onClick={addCommentHandler}
          >
            Add comment
          </Typography>
        )}
      </Box>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          mb: 3,
          mt: 3,
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1);",
        }}
      >
        {!isError &&
          !isPending &&
          comments &&
          comments?.map((comment) => (
            <>
              <ListItem alignItems="flex-start" key={comment.id}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={comment?.userDTO?.imageUrl} />
                </ListItemAvatar>
                <ListItemText
                  sx={{ color: "#302e4d" }}
                  primary={comment.userDTO?.login}
                  secondary={
                    <React.Fragment>
                      {new Date(comment?.datePosted).toLocaleString("en-US", {
                        dateStyle: "medium",
                      })}
                      {" — "}
                      {comment.content}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
      </List>
      <CommentsDialog />
    </Container>
  );
}
