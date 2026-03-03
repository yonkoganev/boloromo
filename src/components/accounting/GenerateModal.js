import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function GenerateModal({ open, onClose, onGenerated }) {
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

  const showSuccess = (message) =>
    setSnackbar({ open: true, type: "success", message });

  const showError = (message) =>
    setSnackbar({ open: true, type: "error", message });

  const resetState = () => {
    setCompany("");
    setMarketPlace("");
    setYear("");
    setMonth("");
    setConfirmReplace(false);
    setLoading(false);
  };

  const runAccounting = async (force = false) => {
    try {
      setLoading(true);
      setConfirmReplace(false);

      const res = await fetch(`${API_URL}/process/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: String(company),
          marketplace: String(marketPlace), // 👈 force exact key
          year: String(year),
          month: String(month),
        }),

      });

      if (!res.ok) {
        let errorMessage = "Failed to generate accounting file.";

        try {
          const data = await res.json();
          if (res.status === 409) {
            setConfirmReplace(true);
            setLoading(false);
            return;
          }
          if (data?.detail) errorMessage = data.detail;
        } catch {}

        throw new Error(errorMessage);
      }

      showSuccess("Accounting file generated successfully 🎉");
      onGenerated?.();
      onClose();
      resetState();
    } catch (e) {
      showError(e?.message ?? "Processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MAIN MODAL */}
      <Dialog
        open={open}
        onClose={loading ? null : onClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Generate Accounting Report</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              select
              label="Company"
              value={company}
              disabled={loading}
              onChange={(e) => setCompany(e.target.value)}
            >
              {companies.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Marketplace"
              value={marketPlace}
              disabled={loading}
              onChange={(e) => setMarketPlace(e.target.value)}
            >
              {marketplaces.map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Year"
              value={year}
              disabled={loading}
              onChange={(e) => setYear(e.target.value)}
            >
              {Array.from(
                { length: new Date().getFullYear() - 2022 + 1 },
                (_, i) => 2022 + i
              ).map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Month"
              value={month}
              disabled={loading}
              onChange={(e) => setMonth(e.target.value)}
            >
              {months.map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </TextField>

            {loading && (
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                mt={1}
              >
                <CircularProgress size={20} />
                <Typography fontSize={14} color="text.secondary">
                  Processing data… this may take a few seconds
                </Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button disabled={loading} onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            startIcon={!loading && <PlayArrowIcon />}
            disabled={
              !company || !marketPlace || !year || !month || loading
            }
            onClick={() => runAccounting(false)}
          >
            {loading ? "Generating…" : "Generate"}
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
            A final accounting file already exists for this selection.
          </Typography>
          <Typography mt={1}>
            Generating again will <b>replace the existing file</b>.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setConfirmReplace(false)}>Cancel</Button>
          <Button
            color="warning"
            variant="contained"
            onClick={() => runAccounting(true)}
          >
            Replace & Generate
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() =>
          setSnackbar((prev) => ({ ...prev, open: false }))
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
          sx={{ fontWeight: 600, borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
