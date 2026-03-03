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
  DialogContentText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const TYPES = [
  { label: "Warehouse (BG)", value: "warehouse_bg" },
  { label: "Warehouse (DE)", value: "warehouse_de" },
  { label: "TAROS", value: "taros" },
];

export default function UploadWarehouseModal({ open, onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const showSuccess = (msg) =>
  setSnackbar({ open: true, type: "success", message: msg });

  const showError = (msg) =>
    setSnackbar({ open: true, type: "error", message: msg });

  const checkExists = async () => {
    const res = await fetch(
      `${API_URL}/files/exists?category=warehouse&filename=${encodeURIComponent(
        file.name
      )}`
    );
    const data = await res.json();
    data.exists ? setConfirmReplace(true) : upload();
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "warehouse");
      formData.append("type", type);

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let msg = "Upload failed.";
        try {
          const data = await res.json();
          if (data?.detail) msg = data.detail;
        } catch {}
        throw new Error(msg);
      }

      showSuccess("Warehouse file uploaded successfully");
      onUploaded?.();

      setTimeout(() => {
        setFile(null);
        setType("");
        setConfirmReplace(false);
        onClose();
      }, 300);
    } catch (err) {
      showError(
        err.message || "Something went wrong while uploading the file."
      );
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Add Warehouse File</DialogTitle>

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
                  bgcolor: "primary.main",
                  borderRadius: 1,
                  px: 2,
                  py: 1,
                }}
              >
                <Typography color="white">{file.name}</Typography>
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
              label="File type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              fullWidth
            >
              {TYPES.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!file || !type}
            onClick={checkExists}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* REPLACE CONFIRM */}
      <Dialog open={confirmReplace} onClose={() => setConfirmReplace(false)}>
        <DialogTitle sx={{ display: "flex", gap: 1 }}>
          <WarningAmberIcon color="warning" />
          Replace existing file?
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            A file with this name already exists. Uploading will replace it.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmReplace(false)}>
            Cancel
          </Button>
          <Button color="warning" variant="contained" onClick={upload}>
            Replace
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar((prev) => ({ ...prev, open: false }))
        }
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
    </>
  );
}
