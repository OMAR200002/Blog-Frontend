import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import classes from "./reset-password.module.css";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ResetPasswordFinish from "@/components/reset-password/reset-password-finish";
import ResetPasswordInit from "@/components/reset-password/reset-password-init";

const ResetPasswordComponent = () => {
  // Reset password stage : init,finish
  //init stage: user enter his email => get secret key via email
  //finish stage: change password
  const [resetPasswordStage, setResetPasswordStage] = useState("init");
  const [secretKey, setSecretKey] = useState("");

  return (
    <div className={classes["reset-password"]}>
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 4 }} className={classes["form-container"]}>
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
          {resetPasswordStage === "init" && (
            <ResetPasswordInit
              changeResetPasswordStage={setResetPasswordStage}
              storeSecretKey={setSecretKey}
            />
          )}
          {resetPasswordStage === "finish" && (
            <ResetPasswordFinish secretKey={secretKey} />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default ResetPasswordComponent;
