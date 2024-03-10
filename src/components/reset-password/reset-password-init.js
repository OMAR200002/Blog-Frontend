import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "@/lib/api/http-auth";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

function ResetPasswordInit(props) {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (data) => {
      props.changeResetPasswordStage("finish");
      props.storeSecretKey(data);
    },
  });

  const [formData, setFormData] = useState({
    email: "",
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
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
        required
      />
      {!isPending && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Request secret key
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
          Request secret key
        </LoadingButton>
      )}
    </form>
  );
}

export default ResetPasswordInit;
