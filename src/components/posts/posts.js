import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Post from "@/components/posts/post";
import Grid from "@mui/material/Grid";
import MultipleSelectFilterPosts from "@/components/posts/multiple-select-filter-posts";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FloatingActionButton from "@/components/floating-action-button";
import { useQuery } from "@tanstack/react-query";
import { fetchTags } from "@/lib/api/http-tags";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchPosts } from "@/lib/api/http-post";
import { queryClient } from "@/pages/_app";
import Pagination from "@mui/material/Pagination";

function Posts() {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
    setIsCriteriaChanged((prevState) => !prevState);
  };
  const {
    data: tags,
    isPendingTags,
    isErrorTags,
    errorTags,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentTags, setCurrentTags] = useState("");
  const [isCriteriaChanged, setIsCriteriaChanged] = useState(false);

  const {
    data: result,
    isPending: isPendingPosts,
    isError: isErrorPosts,
    error: errorPosts,
  } = useQuery({
    queryKey: ["posts", isCriteriaChanged, currentTags, page],
    queryFn: ({ signal }) => fetchPosts(page - 1, searchTerm, currentTags),
  });

  useEffect(() => {
    // Debounced function for handling searchTerm change
    const debounce = setTimeout(() => {
      setIsCriteriaChanged((prevState) => !prevState);
    }, 500);

    // Clear the timeout on every searchTerm change
    return () => clearTimeout(debounce);
  }, [searchTerm]); // Re-run effect whenever searchTerm changes

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const updateTagsHandler = (tags) => {
    const joinedTags = tags.join(",");
    // if tags are the same => no filter
    if (joinedTags === currentTags) {
      return;
    }
    setCurrentTags(joinedTags);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f8f9fa",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              sx={{ width: { xs: "100%", md: "auto" } }}
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <SearchIcon
                    style={{ marginRight: "8px", color: "#757575" }}
                  />
                ),
              }}
            />
            <MultipleSelectFilterPosts
              width="400"
              data={tags || []}
              onTagsChange={updateTagsHandler}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {!isErrorPosts && !isPendingPosts && result?.posts.length === 0 && (
              <Typography component="p" sx={{ mt: 2 }}>
                No posts available
              </Typography>
            )}
            {isPendingPosts && (
              <Box
                sx={{ display: "flex", justifyContent: "center", padding: 2 }}
              >
                <CircularProgress color="inherit" />
              </Box>
            )}
            <Grid container spacing={2}>
              {isErrorPosts && <p>Failed to load Posts</p>}
              {!isErrorPosts &&
                !isPendingPosts &&
                result?.posts?.map((post) => (
                  <Grid item lg={4} sm={6} xs={12} key={post.id}>
                    <Post img="assets/AI.jpg" data={post} />
                  </Grid>
                ))}
            </Grid>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
            <Pagination
              count={result?.totalPages || 0}
              page={page}
              variant="outlined"
              color="primary"
              onChange={handlePageChange}
            />
          </Box>
        </Container>
      </Box>
      <FloatingActionButton />
    </>
  );
}

export default Posts;
