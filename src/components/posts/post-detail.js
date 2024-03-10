import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import Code from "@/components/markdown-editor/code";
import Image from "@/components/markdown-editor/image";
import Markdown from "markdown-to-jsx";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useQuery } from "@tanstack/react-query";
import { fetchPost, fetchPosts } from "@/lib/api/http-post";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import CommentsList from "@/components/comments/comments";
import { postActions } from "@/lib/store/post";

const PostDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const {
    data: post,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: ({ signal }) => fetchPost(id),
    enabled: typeof id !== "undefined",
  });

  if (!post) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  dispatch(postActions.updatePostId(id));

  return (
    <Container maxWidth="lg">
      <Typography
        component="div"
        sx={{
          marginBottom: "2rem",
          borderRadius: "12px",
          background:
            "linear-gradient(135deg, hsla(203, 58%, 47%, 1) 0%, hsla(203, 58%, 47%, 1) 36%, hsla(226, 67%, 76%, 1) 100%)",
          color: "#fff",
          padding: "4rem",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Typography component="p">
          {new Date(post.date).toLocaleString("en-US", { dateStyle: "medium" })}{" "}
          ⋅ 7 min read
        </Typography>
        <Typography component="h1" variant="h4">
          {post.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Typography component="div">
            <Typography component="p" variant="h5">
              k.omar
            </Typography>
            <Typography
              component="p"
              sx={{ color: "#fffffff2", fontSize: "14px" }}
            >
              I am a fullstack software engineer. In my free time i love to
              write about various technical topics.
            </Typography>
          </Typography>
        </Box>
      </Typography>
      <Markdown
        options={{
          overrides: {
            Code: {
              component: Code,
            },
            Img: {
              component: Image,
            },
          },
        }}
      >
        {post.content}
      </Markdown>
      <CommentsList postId={id} />
    </Container>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}

export default PostDetail;
