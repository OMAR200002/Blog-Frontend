import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import classes from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../lib/api/http-auth";
import { useMutation } from "@tanstack/react-query";
import ErrorBlock from "@/components/error/error-block";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";
import { authActions, getUserInfo } from "@/lib/store/auth";

const LoginForm = () => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (data) => {
      const userInfo = getUserInfo(data["id_token"]);
      dispatch(authActions.authenticateUser(userInfo));
      router.push("/");
    },
  });

  const router = useRouter();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className={classes["login"]}>
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
              fullWidth
              label="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            {!isPending && isError && (
              <ErrorBlock
                title="Failed to login"
                message={
                  error.info?.message || "Username or password is incorrect"
                }
              />
            )}
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
          <Link
            href="/reset-password"
            variant="body2"
            sx={{ display: "block", textAlign: "center", mt: 2 }}
          >
            Forgot password?
          </Link>
        </Box>
      </Container>
    </div>
  );
};

export default LoginForm;
