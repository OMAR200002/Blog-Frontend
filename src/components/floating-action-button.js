import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";

const FloatingActionButton = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const handleCreatePost = () => {
    router.push("/posts/create-post");
  };
  return (
    <>
      {isAuthenticated && (
        <Tooltip title="Create post">
          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: "fixed", right: "20px", bottom: "20px" }}
            onClick={handleCreatePost}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
    </>
  );
};

export default FloatingActionButton;
