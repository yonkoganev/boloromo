import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Stack, Typography,
  CircularProgress, Box,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState } from "react";
import { COMPANIES, MARKETPLACES, MONTHS, YEARS } from "../../shared/constants";
import AppSnackbar from "../../shared/AppSnackbar";
import { useSnackbar } from "../../shared/useSnackbar";
import ReplaceConfirmDialog from "../../shared/ReplaceConfirmDialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function GenerateModal({ open, onClose, onGenerated }) {
  const [company, setCompany] = useState("");
  const [marketPlace, setMarketPlace] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [loading, setLoading] = useState(false);
  const { snackbar, showSuccess, showError, closeSnackbar } = useSnackbar();

  const reset = () => {
    setCompany(""); setMarketPlace(""); setYear(""); setMonth("");
    setConfirmReplace(false); setLoading(false);
  };

  const runAccounting = async () => {
    try {
      setLoading(true);
      setConfirmReplace(false);

      const res = await fetch(`${API_URL}/process/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: String(company),
          marketplace: String(marketPlace),
          year: String(year),
          month: String(month),
        }),
      });

      if (!res.ok) {
        if (res.status === 409) {
          setLoading(false);
          setConfirmReplace(true);
          return;
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || "Failed to generate accounting file.");
      }

      showSuccess("Accounting file generated successfully 🎉");
      onGenerated?.();
      onClose();
      reset();
    } catch (e) {
      showError(e?.message ?? "Processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Generate Accounting Report</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField select label="Company" value={company} disabled={loading} onChange={(e) => setCompany(e.target.value)}>
              {COMPANIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
            <TextField select label="Marketplace" value={marketPlace} disabled={loading} onChange={(e) => setMarketPlace(e.target.value)}>
              {MARKETPLACES.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </TextField>
            <TextField select label="Year" value={year} disabled={loading} onChange={(e) => setYear(e.target.value)}>
              {YEARS.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
            </TextField>
            <TextField select label="Month" value={month} disabled={loading} onChange={(e) => setMonth(e.target.value)}>
              {MONTHS.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </TextField>
            {loading && (
              <Box display="flex" alignItems="center" gap={1.5}>
                <CircularProgress size={18} />
                <Typography fontSize={13} color="text.secondary">
                  Processing data… this may take a few seconds
                </Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={!loading && <PlayArrowIcon />}
            disabled={!company || !marketPlace || !year || !month || loading}
            onClick={runAccounting}
          >
            {loading ? "Generating…" : "Generate"}
          </Button>
        </DialogActions>
      </Dialog>

      <ReplaceConfirmDialog
        open={confirmReplace}
        onClose={() => setConfirmReplace(false)}
        onConfirm={runAccounting}
      />
      <AppSnackbar snackbar={snackbar} onClose={closeSnackbar} />
    </>
  );
}
