import React from "react";
import Typography from "@mui/material/Typography";
import classes from "./image.module.css";

const Image = ({ src, alt, width, height }) => {
  return (
    <Typography component="div" sx={{ padding: "20px", textAlign: "center" }}>
      <img
        src={src}
        className={classes.img}
        alt={alt}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: "15px",
        }}
      />
    </Typography>
  );
};

export default Image;
