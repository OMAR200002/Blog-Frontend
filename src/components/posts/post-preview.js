import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Code from "@/components/markdown-editor/code";
import Image from "@/components/markdown-editor/image";
import Markdown from "markdown-to-jsx";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

const PostPreview = () => {
  const post = useSelector((state) => state.post.post);
  const userInfo = useSelector((state) => state.auth.userInfo);
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
        <Typography component="div">
          {new Date(post.date).toLocaleString("en-US", { dateStyle: "medium" })}{" "}
          ⋅ 7 min read
        </Typography>
        <Typography component="h1" variant="h4">
          {post.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Avatar alt="Remy Sharp" src={userInfo.imageUrl} />
          <Typography component="div">
            <Typography component="p" variant="h5">
              {userInfo.username}
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
    </Container>
  );
};

export default PostPreview;
