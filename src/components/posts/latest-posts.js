import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Post from "@/components/posts/post";
import Grid from "@mui/material/Grid";
import React from "react";
import MainTitle from "@/components/main-title/main-title";
import { useQuery } from "@tanstack/react-query";
import { fetchLatestPosts } from "@/lib/api/http-post";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

function LatestPosts() {
  const {
    data: latestPosts,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["latestPosts"],
    queryFn: fetchLatestPosts,
  });
  return (
    <div id="lastestPosts">
      <Box
        sx={{
          backgroundColor: "#fff",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <Container maxWidth="lg">
          <MainTitle title="Latest posts" />
          {isPending && (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
              <CircularProgress color="inherit" />
            </Box>
          )}
          {isError && <p>Failed to load latest Posts</p>}
          {!isError && !isPending && (
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {latestPosts.map((post) => (
                  <Grid item lg={4} sm={6} xs={12} key={post.id}>
                    <Post img="assets/AI.jpg" data={post} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          {!isError && !isPending && latestPosts.length === 0 && (
            <Box>
              <Typography component="p">No posts available</Typography>
            </Box>
          )}
        </Container>
      </Box>
    </div>
  );
}

export default LatestPosts;
