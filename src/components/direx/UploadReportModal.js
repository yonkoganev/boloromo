import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Box,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useState } from "react";

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UploadReportModal({ open, onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);

  // overwrite confirmation
  const [confirmOpen, setConfirmOpen] = useState(false);

  // snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success", // success | error
    message: "",
  });

  const showSuccess = (message) =>
    setSnackbar({ open: true, type: "success", message });

  const showError = (message) =>
    setSnackbar({ open: true, type: "error", message });

  // ---------- CHECK & CONFIRM ----------
  const handleUploadClick = async () => {
    if (!file || !year || !month) return;

    try {
      const res = await fetch(
        `${API_URL}/files/exists?category=direx&filename=${encodeURIComponent(
          file.name
        )}`
      );
      const data = await res.json();

      if (data.exists) {
        setConfirmOpen(true);
      } else {
        handleUpload();
      }
    } catch {
      showError("Unable to verify existing files. Please try again.");
    }
  };

  // ---------- ACTUAL UPLOAD ----------
  const handleUpload = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "direx");
      formData.append("year", year);
      formData.append("month", month);

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let msg = "Upload failed. Please try again.";
        try {
          const data = await res.json();
          if (data?.detail) msg = data.detail;
        } catch {}
        throw new Error(msg);
      }

      showSuccess("Direx report uploaded successfully 🎉");

      setFile(null);
      setYear("");
      setMonth("");
      onUploaded?.();
      onClose();
    } catch (err) {
      showError(
        err.message ||
          "Something went wrong while uploading. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MAIN UPLOAD DIALOG */}
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Add Direx Report</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            {!file ? (
              <Button variant="contained" component="label">
                Choose File
                <input
                  hidden
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "primary.main",
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                }}
              >
                <Typography color="white" fontWeight={600}>
                  {file.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => setFile(null)}
                  sx={{ color: "white" }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            )}

            <TextField
              select
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
            >
              {Array.from(
                { length: new Date().getFullYear() - 2022 + 1 },
                (_, i) => 2022 + i
              ).map((y) => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              fullWidth
            >
              {months.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!file || !year || !month || loading}
            onClick={handleUploadClick}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* OVERWRITE CONFIRMATION */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberIcon color="warning" />
          File already exists
        </DialogTitle>

        <DialogContent>
          <Typography>
            A file named <b>{file?.name}</b> already exists for:
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {month} {year}
          </Typography>

          <Typography sx={{ mt: 2 }} color="warning.main">
            Uploading again will replace the existing file.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              setConfirmOpen(false);
              handleUpload();
            }}
          >
            Replace file
          </Button>
        </DialogActions>
      </Dialog>

      {/* SUCCESS / ERROR SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
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
          sx={{
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
