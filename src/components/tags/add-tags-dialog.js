import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { postActions } from "@/lib/store/post";

function AddTagsDialog(props) {
  const [newTags, setNewTags] = useState([]);
  const { onClose, selectedValue, open } = props;
  const [newTag, setNewTag] = useState("");
  const handleClose = () => {
    onClose(newTags);
    setNewTags([]);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleChange = (e) => {
    setNewTag(e.target.value);
  };
  const addNewTagHandler = () => {
    if (newTag === "") {
      return;
    }
    setNewTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {newTags.map((tag) => (
          <ListItem key={tag} disablePadding>
            <ListItemButton>
              <ListItemText primary={tag} />
            </ListItemButton>
          </ListItem>
        ))}
        <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
          <TextField
            fullWidth
            label="New tag"
            id="fullWidth"
            value={newTag}
            onChange={handleChange}
          />
          <Avatar
            sx={{ ml: 2, backgroundColor: "var(--main-color)" }}
            onClick={addNewTagHandler}
          >
            <AddIcon />
          </Avatar>
        </Box>
      </List>
    </Dialog>
  );
}

export default AddTagsDialog;
