import React from "react";
import CustomizedSteppers from "@/components/stepper/stepper";
import Container from "@mui/material/Container";
import MarkdownEditor from "@/components/markdown-editor/markdown-editor";
import { useDispatch, useSelector } from "react-redux";
import CreatePostForm from "@/components/posts/create-post/create-post-form";
import { postActions } from "@/lib/store/post";
import PostPreview from "@/components/posts/post-preview";

const CreatePost = () => {
  const activeStep = useSelector((state) => state.post.activeStep);
  const dispatch = useDispatch();

  const AddPostInfoHandler = (postInfo) => {
    dispatch(postActions.AddPostInfo(postInfo));
    dispatch(postActions.nextStep());
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "60px 0", width: 0.7 }}>
      <CustomizedSteppers />
      {activeStep === 0 && (
        <CreatePostForm onAddPostInfo={AddPostInfoHandler} />
      )}
      {activeStep === 1 && <MarkdownEditor />}
      {activeStep === 2 && <PostPreview />}
    </Container>
  );
};

export default CreatePost;
