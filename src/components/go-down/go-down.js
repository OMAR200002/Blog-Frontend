import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Typography from "@mui/material/Typography";
import classes from "./go-down.module.css";
function GoDown() {
  return (
    <>
      <Typography
        component="a"
        href="#lastestPosts"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        className={classes["go-down"]}
      >
        <KeyboardDoubleArrowDownIcon />
        <KeyboardDoubleArrowDownIcon />
      </Typography>
    </>
  );
}

export default GoDown;
