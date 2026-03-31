import { useState } from "react";

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const showSuccess = (message) =>
    setSnackbar({ open: true, type: "success", message });

  const showError = (message) =>
    setSnackbar({ open: true, type: "error", message });

  const closeSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  return { snackbar, showSuccess, showError, closeSnackbar };
}
