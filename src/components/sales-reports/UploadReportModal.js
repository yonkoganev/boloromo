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
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const companies = [
  "AUTOMARKET 22",
  "ARA GROUP",
  "Motosviqt99",
  "MAKSI GROUP",
  "Mk-Market",
];

const marketplaces = ["eBay", "Temu", "Amazon", "EMAG"];

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export default function UploadModal({ open, onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [company, setCompany] = useState("");
  const [marketPlace, setMarketPlace] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const showSuccess = (msg) =>
    setSnackbar({ open: true, type: "success", message: msg });

  const showError = (msg) =>
    setSnackbar({ open: true, type: "error", message: msg });

  const resetForm = () => {
    setFile(null);
    setCompany("");
    setMarketPlace("");
    setYear("");
    setMonth("");
    setConfirmReplace(false);
  };

  const checkExistsAndUpload = async () => {
    const res = await fetch(
      `${API_URL}/files/exists?category=sales&filename=${encodeURIComponent(
        file.name
      )}`
    );
    const data = await res.json();

    if (data.exists) {
      setConfirmReplace(true);
    } else {
      uploadFile();
    }
  };

  const uploadFile = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "sales");
      formData.append("company", company);
      formData.append("marketplace", marketPlace);
      formData.append("year", year);
      formData.append("month", month);

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Upload failed");
      }

      showSuccess("Sales report uploaded successfully");
      resetForm();
      onUploaded?.();
      onClose();
    } catch (e) {
      showError(
        e.message ||
          "We couldn’t upload the file. Please try again or contact support."
      );
    } finally {
      setLoading(false);
      setConfirmReplace(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Add Sales Report</DialogTitle>

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
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              fullWidth
            >
              {companies.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Marketplace"
              value={marketPlace}
              onChange={(e) => setMarketPlace(e.target.value)}
              fullWidth
            >
              {marketplaces.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </TextField>

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
            disabled={
              !file ||
              !company ||
              !marketPlace ||
              !year ||
              !month ||
              loading
            }
            onClick={checkExistsAndUpload}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* REPLACE CONFIRMATION */}
      <Dialog open={confirmReplace} onClose={() => setConfirmReplace(false)}>
        <DialogTitle sx={{ display: "flex", gap: 1 }}>
          <WarningAmberIcon color="warning" />
          Replace existing file?
        </DialogTitle>

        <DialogContent>
          <Typography>
            A file with this name already exists.
          </Typography>
          <Typography mt={1}>
            Uploading will <b>replace the existing file</b>.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmReplace(false)}>Cancel</Button>
          <Button color="warning" variant="contained" onClick={uploadFile}>
            Replace
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.type}
          variant="filled"
          icon={
            snackbar.type === "success" ? (
              <CheckCircleIcon />
            ) : (
              <ErrorOutlineIcon />
            )
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
