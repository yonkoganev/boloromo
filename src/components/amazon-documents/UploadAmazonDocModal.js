import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, MenuItem, Stack, Typography, Box, Chip,
} from "@mui/material";
import { useState } from "react";
import { COMPANIES, MARKETPLACES, MONTHS, YEARS, AMAZON_DOCUMENT_TYPES } from "../../shared/constants";
import FilePicker from "../../shared/FilePicker";
import AppSnackbar from "../../shared/AppSnackbar";
import { useSnackbar } from "../../shared/useSnackbar";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UploadAmazonDocModal({ open, onClose, onUploaded }) {
  const [files, setFiles] = useState([]);
  const [company, setCompany] = useState("");
  const [marketPlace, setMarketPlace] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [docType, setDocType] = useState("");
  const [loading, setLoading] = useState(false);
  const { snackbar, showSuccess, showError, closeSnackbar } = useSnackbar();

  const reset = () => {
    setFiles([]); setCompany(""); setMarketPlace("");
    setYear(""); setMonth(""); setDocType("");
  };

  const handleFiles = (selected) => {
    if (!selected) return;
    const arr = Array.isArray(selected) ? selected : [selected];
    setFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      return [...prev, ...arr.filter((f) => !names.has(f.name))];
    });
  };

  const removeFile = (name) => setFiles((prev) => prev.filter((f) => f.name !== name));

  const doUpload = async () => {
    try {
      setLoading(true);
      let successCount = 0;
      let errorCount = 0;

      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("category", "amazon_document");
        fd.append("type", docType);
        fd.append("company", company);
        fd.append("marketplace", marketPlace);
        fd.append("year", year);
        fd.append("month", month);

        const res = await fetch(`${API_URL}/upload`, { method: "POST", body: fd });
        if (res.ok) {
          successCount++;
        } else {
          errorCount++;
        }
      }

      if (successCount > 0) showSuccess(`${successCount} file(s) uploaded successfully`);
      if (errorCount > 0) showError(`${errorCount} file(s) failed to upload`);

      onUploaded?.();
      onClose();
      reset();
    } catch (e) {
      showError(e.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = files.length > 0 && company && marketPlace && year && month && docType && !loading;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle>Upload Amazon Documents</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>

            {/* Multi-file picker */}
            <FilePicker file={null} onFile={handleFiles} accept=".pdf" multiple />

            {/* File chips */}
            {files.length > 0 && (
              <Box display="flex" flexWrap="wrap" gap={1}>
                {files.map((f) => (
                  <Chip
                    key={f.name}
                    icon={<DescriptionIcon sx={{ fontSize: 14 }} />}
                    label={f.name}
                    size="small"
                    onDelete={() => removeFile(f.name)}
                    deleteIcon={<CloseIcon sx={{ fontSize: 14 }} />}
                    sx={{ fontSize: 11, maxWidth: 200 }}
                  />
                ))}
              </Box>
            )}

            <TextField select label="Document Type" value={docType} onChange={(e) => setDocType(e.target.value)} fullWidth>
              {AMAZON_DOCUMENT_TYPES.map((t) => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
            </TextField>

            <TextField select label="Company" value={company} onChange={(e) => setCompany(e.target.value)} fullWidth>
              {COMPANIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>

            <TextField select label="Year" value={year} onChange={(e) => setYear(e.target.value)} fullWidth>
              {YEARS.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
            </TextField>

            <TextField select label="Month" value={month} onChange={(e) => setMonth(e.target.value)} fullWidth>
              {MONTHS.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </TextField>

            <Typography fontSize={12} color="text.secondary">
              All selected files will be uploaded with the same type, company, marketplace, year and month.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" disabled={!canSubmit} onClick={doUpload}>
            {loading ? "Uploading…" : `Upload ${files.length > 1 ? `${files.length} Files` : "File"}`}
          </Button>
        </DialogActions>
      </Dialog>

      <AppSnackbar snackbar={snackbar} onClose={closeSnackbar} />
    </>
  );
}
