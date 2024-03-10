import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "@/lib/store/post";
import Typography from "@mui/material/Typography";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCreatePost(props) {
  const tags = useSelector((state) => state.post.post.tags) || [];

  const dispatch = useDispatch();

  const data = props.data;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(postActions.updatePostTags(value));
  };

  return (
    <FormControl
      sx={{
        m: 1,
        width: {
          xs: "calc(100vw - 30px)",
          md: parseInt(props.width),
          margin: props.margin || "",
        },
      }}
    >
      <InputLabel
        id="demo-multiple-checkbox-label"
        fullwidth
        sx={{ color: props.isError && "#ef5350" }}
      >
        Tag
      </InputLabel>
      <Select
        error={props.isError}
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={tags}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {data.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={tags.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
      {props.isError && (
        <Typography component="p" sx={{ color: "#ef5350", mt: 1 }}>
          {props.helperText}
        </Typography>
      )}
    </FormControl>
  );
}
