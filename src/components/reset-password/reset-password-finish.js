import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { finishPasswordReset, requestPasswordReset } from "@/lib/api/http-auth";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/router";

function ResetPasswordFinish(props) {
  const router = useRouter();
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationFn: finishPasswordReset,
    onSuccess: () => {
      router.push("/login");
    },
  });

  const [formData, setFormData] = useState({
    key: "",
    newPassword: "",
    confirmNewPassword: "",
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
    if (formData.newPassword !== formData.confirmNewPassword) {
      return;
    }
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        error={error?.info?.title.includes(
          "no.user.was.found.for.this.reset.key",
        )}
        fullWidth
        label="Secret Key"
        name="key"
        value={formData.key}
        onChange={handleChange}
        margin="normal"
        required
        helperText={
          error?.info?.title.includes("no.user.was.found.for.this.reset.key") &&
          error?.info?.detail
        }
      />
      <TextField
        error={error?.info?.title.includes("password")}
        fullWidth
        label="New password"
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        margin="normal"
        required
        helperText={
          error?.info?.title.includes("password") && error?.info?.detail
        }
      />
      <TextField
        error={formData.newPassword !== formData.confirmNewPassword}
        fullWidth
        label="Confirm new password"
        type="password"
        name="confirmNewPassword"
        value={formData.confirmNewPassword}
        onChange={handleChange}
        margin="normal"
        required
        helperText={
          formData.newPassword !== formData.confirmNewPassword &&
          "Confirm new password"
        }
      />
      {!isPending && (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Change password
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
          Change password
        </LoadingButton>
      )}
    </form>
  );
}

export default ResetPasswordFinish;
