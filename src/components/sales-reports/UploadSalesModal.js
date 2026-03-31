import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Stack,
} from "@mui/material";
import { useState } from "react";
import { COMPANIES, MARKETPLACES, MONTHS, YEARS } from "../../shared/constants";
import FilePicker from "../../shared/FilePicker";
import ReplaceConfirmDialog from "../../shared/ReplaceConfirmDialog";
import AppSnackbar from "../../shared/AppSnackbar";
import { useSnackbar } from "../../shared/useSnackbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UploadSalesModal({ open, onClose, onUploaded }) {
  const [file, setFile] = useState(null);
  const [company, setCompany] = useState("");
  const [marketPlace, setMarketPlace] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [loading, setLoading] = useState(false);
  const { snackbar, showSuccess, showError, closeSnackbar } = useSnackbar();

  const reset = () => {
    setFile(null); setCompany(""); setMarketPlace("");
    setYear(""); setMonth(""); setConfirmReplace(false);
  };

  const checkAndUpload = async () => {
    const res = await fetch(`${API_URL}/files/exists?category=sales&filename=${encodeURIComponent(file.name)}`);
    const data = await res.json();
    data.exists ? setConfirmReplace(true) : doUpload();
  };

  const doUpload = async () => {
    try {
      setLoading(true);
      setConfirmReplace(false);
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", "sales");
      fd.append("company", company);
      fd.append("marketplace", marketPlace);
      fd.append("year", year);
      fd.append("month", month);

      const res = await fetch(`${API_URL}/upload`, { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Upload failed");
      }
      showSuccess("Sales report uploaded successfully");
      onUploaded?.();
      onClose();
      reset();
    } catch (e) {
      showError(e.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Add Sales Report</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <FilePicker file={file} onFile={setFile} />
            <TextField select label="Company" value={company} onChange={(e) => setCompany(e.target.value)} fullWidth>
              {COMPANIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
            <TextField select label="Marketplace" value={marketPlace} onChange={(e) => setMarketPlace(e.target.value)} fullWidth>
              {MARKETPLACES.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </TextField>
            <TextField select label="Year" value={year} onChange={(e) => setYear(e.target.value)} fullWidth>
              {YEARS.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
            </TextField>
            <TextField select label="Month" value={month} onChange={(e) => setMonth(e.target.value)} fullWidth>
              {MONTHS.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" disabled={!file || !company || !marketPlace || !year || !month || loading} onClick={checkAndUpload}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      <ReplaceConfirmDialog
        open={confirmReplace}
        onClose={() => setConfirmReplace(false)}
        onConfirm={doUpload}
        fileName={file?.name}
      />
      <AppSnackbar snackbar={snackbar} onClose={closeSnackbar} />
    </>
  );
}
