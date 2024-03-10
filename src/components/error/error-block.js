import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ErrorBlock = ({ title, message }) => {
  return (
    <Box sx={{ backgroundColor: "error.light", p: 1 }}>
      <Typography variant="h6" sx={{ color: "white" }}>
        {title}
      </Typography>
      <Typography component="p" sx={{ color: "white" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorBlock;
