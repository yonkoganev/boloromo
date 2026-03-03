import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FileTable({ files, loading, onDeleted }) {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const showSuccess = (message) =>
    setSnackbar({ open: true, type: "success", message });

  const showError = (message) =>
    setSnackbar({ open: true, type: "error", message });

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(
        `${API_URL}/files?category=direx&filename=${encodeURIComponent(
          deleteTarget.name
        )}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        let msg = "Failed to delete the file.";
        try {
          const data = await res.json();
          if (data?.detail) msg = data.detail;
        } catch {}
        throw new Error(msg);
      }

      showSuccess("File deleted successfully");
      setDeleteTarget(null);
      onDeleted?.();
    } catch (err) {
      showError(
        err.message || "Something went wrong while deleting the file."
      );
    }
  };

  return (
    <>
      {/* CONTENT */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : !files.length ? (
        <Typography color="text.secondary">
          No files found
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {files.map((file) => (
              <TableRow key={file.name}>
                <TableCell>{file.name}</TableCell>

                <TableCell align="right">
                  {/* DOWNLOAD */}
                  <IconButton
                    size="small"
                    onClick={() =>
                      window.open(
                        `${API_URL}/download?category=direx&filename=${encodeURIComponent(
                          file.name
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    <DownloadIcon />
                  </IconButton>

                  {/* DELETE */}
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setDeleteTarget(file)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* DELETE CONFIRMATION */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberIcon color="warning" />
          Delete file
        </DialogTitle>

        <DialogContent>
          <Typography>You are about to permanently delete:</Typography>
          <Typography sx={{ fontWeight: 700, mt: 1 }}>
            {deleteTarget?.name}
          </Typography>
          <Typography color="warning.main" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR (NOW ALWAYS MOUNTED) */}
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
 