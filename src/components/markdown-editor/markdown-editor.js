import React, { useState } from "react";
import { TextField, Paper, Typography, Grid, Box } from "@mui/material";
import Markdown from "markdown-to-jsx";
import Code from "./code";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "@/lib/store/post";
import Image from "@/components/markdown-editor/image";

function MarkdownEditor() {
  const post = useSelector((state) => state.post.post);
  const [markdownText, setMarkdownText] = useState(post.content);
  const dispatch = useDispatch();

  const handleTextChange = (event) => {
    setMarkdownText(event.target.value);
    dispatch(postActions.updatePostContent(event.target.value));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: "20px 30px" }}>
          <TextField
            label="Markdown Text"
            multiline
            fullWidth
            rows={15}
            value={markdownText}
            onChange={handleTextChange}
            variant="outlined"
            sx={{ border: "none" }}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Preview
        </Typography>
        <Paper elevation={3} sx={{ padding: "20px 30px" }}>
          <div className="markdown-content"></div>
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
            {markdownText}
          </Markdown>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MarkdownEditor;
