import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { postActions } from "@/lib/store/post";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";

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

export default function MultipleSelectFilterPosts(props) {
  const [tags, setTags] = React.useState([]);

  const data = props.data;

  useEffect(() => {
    // Debounced function for handling tags changes
    const debounce = setTimeout(() => {
      if (tags.length === 0) {
        props.onTagsChange([]);
        return;
      }
      props.onTagsChange(tags);
    }, 500);

    // Clear the timeout on every searchTerm change
    return () => clearTimeout(debounce);
  }, [props, tags]); // Re-run effect whenever tags changes

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(value);
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
