import React, { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import classes from "./create-post-form.module.css";
import { useDispatch, useSelector } from "react-redux";
import MultipleSelectCheckmarks from "@/components/posts/multiple-select-filter-posts";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadImage } from "@/lib/upload-imgaes";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerAccount } from "@/lib/api/http-auth";
import { fetchTags } from "@/lib/api/http-tags";
import AddTagsDialog from "@/components/tags/add-tags-dialog";
import { postActions } from "@/lib/store/post";
import MultipleSelectCreatePost from "@/components/posts/create-post/multiple-select-create-post";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreatePostForm = (props) => {
  const post = useSelector((state) => state.post.post);
  const errorCreatePost = useSelector((state) => state.post.errorCreatePost);
  const dispatch = useDispatch();

  const { data, isPendingTags, isErrorTags, errorTags } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
  const [isAddTagsDialogOpen, setIsAddTagsDialogOpen] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [pickedImage, setPickedImage] = useState();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();

  const [formData, setFormData] = useState({
    title: post.title,
    date: null,
    description: post.description,
    tags: post.tags,
    imageUrl: post.imageUrl,
    content: post.content,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    dispatch(postActions.updateErrorCreatPost({ error: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    if (!formData.imageUrl) {
      setIsPending(false);
      const error = new Error();
      error.info = {
        title: "no.image.selected",
        detail: "No image selected",
      };
      setIsError(true);
      setError(error);
      return;
    }
    if (post.tags.length === 0) {
      setIsPending(false);
      const error = new Error();
      error.info = {
        title: "no.tag.selected",
        detail: "No tag selected",
      };
      setIsError(true);
      setError(error);
      return;
    }
    if (typeof formData.imageUrl !== "string") {
      try {
        const downloadUrl = await uploadImage(formData.imageUrl);
        formData.imageUrl = downloadUrl;
      } catch (err) {
        const error = new Error();
        error.info = {
          title: "error.while.uploading.image",
          detail: "Error while uploading image",
        };
        setIsError(true);
        setError(error);
      }
    }
    props.onAddPostInfo(formData);
  };

  const handleSelectImage = async (e) => {
    const file = e.target.files[0];

    formData.imageUrl = file;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  const addNewTagsHandler = () => {
    setIsAddTagsDialogOpen(true);
  };
  return (
    <div className={classes["create-post-form"]}>
      <Container maxWidth="lg">
        <Box className={classes["form-container"]}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                width: 1,
                height: "200px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
                border: "1px dashed var(--main-color)",
              }}
            >
              {!pickedImage && !formData.imageUrl && (
                <>
                  <Button
                    sx={{ height: "45px" }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    onChange={handleSelectImage}
                  >
                    Select image
                    <VisuallyHiddenInput type="file" />
                  </Button>
                  <Typography
                    component="div"
                    sx={{ width: 1, textAlign: "center", marginTop: 1.5 }}
                  >
                    {isError &&
                      error?.info?.title.includes("no.image.selected") && (
                        <Typography
                          component="p"
                          sx={{ ml: 2, color: "#ef5350" }}
                        >
                          {error?.info?.detail}
                        </Typography>
                      )}
                  </Typography>
                </>
              )}
              {pickedImage && typeof formData.imageUrl !== "string" && (
                <img
                  src={pickedImage}
                  style={{ width: "100%", height: "100%" }}
                  alt="Post image"
                />
              )}
              {typeof formData.imageUrl === "string" && formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  style={{ width: "100%", height: "100%" }}
                  alt="Post image"
                />
              )}
            </Box>
            <TextField
              error={errorCreatePost?.title.includes(
                "post.with.title.already.exists",
              )}
              fullWidth
              label="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
              helperText={
                errorCreatePost?.title.includes(
                  "post.with.title.already.exists",
                ) && errorCreatePost.detail
              }
            />
            <TextField
              fullWidth
              label="description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              required
            />
            <MultipleSelectCreatePost
              width="1"
              margin="15px auto"
              isError={error?.info?.title.includes("no.tag.selected")}
              helperText={
                error?.info?.title.includes("no.tag.selected") &&
                error?.info?.detail
              }
              data={data || []}
            />
            <Typography
              component="a"
              sx={{
                color: "var(--main-color)",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={addNewTagsHandler}
            >
              Add new tag
            </Typography>
            {!isPending && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Next
              </Button>
            )}
            {isPending && (
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
              >
                Next
              </LoadingButton>
            )}
          </form>
        </Box>
      </Container>
      <AddTagsDialog
        open={isAddTagsDialogOpen}
        onClose={(newTags) => {
          dispatch(postActions.AddNewTags(newTags));
          formData.tags = [...formData.tags, ...newTags];
          setIsAddTagsDialogOpen(false);
        }}
      />
    </div>
  );
};

export default CreatePostForm;
