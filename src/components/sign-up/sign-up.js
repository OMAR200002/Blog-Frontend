import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import classes from "./sign-up.module.css";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { useMutation } from "@tanstack/react-query";
import { registerAccount } from "@/lib/api/http-auth";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadImage } from "@/lib/upload-imgaes";

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

const SignUpForm = () => {
  const router = useRouter();

  //Form Data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (formData.password !== formData.confirmPassword) {
      error.info = {
        title: "confirm.password",
        detail: "Confirm password",
      };
      return;
    }
    if (formData.imageUrl === "") {
      setImageUploadError("no.selected.image");
      return;
    }

    mutate(formData);
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: registerAccount,
    onSuccess: () => {
      router.push("/login");
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  //Upload Image
  const [imageUploadError, setImageUploadError] = useState("");
  const handleImageUpload = async (e) => {
    formData.imageUrl = e.target.files[0];
    try {
      if (formData.imageUrl) {
        formData.imageUrl = await uploadImage(formData.imageUrl);
      } else {
        setImageUploadError("no.selected.image");
      }
    } catch (err) {
      setImageUploadError("error.upload.image");
    }
  };

  return (
    <div className={classes["sign-up"]}>
      <Container maxWidth="sm">
        <Box className={classes["form-container"]}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HistoryEduIcon sx={{ mr: 1, color: "var(--main-color)" }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "var(--main-color)",
                textDecoration: "none",
              }}
            >
              BLOG
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              error={error?.info?.title?.includes("username")}
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
              helperText={
                error?.info?.title?.includes("username") && error?.info?.detail
              }
            />
            <TextField
              error={error?.info?.title?.includes("firstname")}
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              required
              helperText={
                error?.info?.title?.includes("firstname") && error?.info?.detail
              }
            />
            <TextField
              error={error?.info?.title?.includes("lastname")}
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              required
              helperText={
                error?.info?.title?.includes("lastname") && error?.info?.detail
              }
            />
            <TextField
              error={error?.info?.title?.includes("email")}
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              helperText={
                error?.info?.title?.includes("email") && error?.info?.detail
              }
            />
            <TextField
              error={error?.info?.title?.includes("password")}
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              helperText={
                error?.info?.title?.includes("password") && error?.info?.detail
              }
            />
            <TextField
              error={error?.info?.title?.includes("confirm.password")}
              fullWidth
              label="Confirm password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              helperText={
                error?.info?.title?.includes("confirm.password") &&
                error?.info?.detail
              }
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                onChange={handleImageUpload}
              >
                Upload image
                <VisuallyHiddenInput type="file" />
              </Button>
              {imageUploadError.includes("error.upload.image") && (
                <Typography component="p" sx={{ ml: 2, color: "#ef5350" }}>
                  Failed to upload image
                </Typography>
              )}
              {imageUploadError.includes("no.selected.image") && (
                <Typography component="p" sx={{ ml: 2, color: "#ef5350" }}>
                  No selected image
                </Typography>
              )}
            </Box>

            {!isPending && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Sign in
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
                Sign in
              </LoadingButton>
            )}
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default SignUpForm;
