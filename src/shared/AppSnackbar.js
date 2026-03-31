import { Snackbar, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function AppSnackbar({ snackbar, onClose }) {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        icon={
          snackbar.type === "success" ? (
            <CheckCircleIcon />
          ) : (
            <ErrorOutlineIcon />
          )
        }
        severity={snackbar.type}
        variant="filled"
        sx={{ fontWeight: 600, borderRadius: 2 }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
