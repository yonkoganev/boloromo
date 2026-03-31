import {
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, Typography, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Chip, Box,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useState } from "react";
import { useSnackbar } from "./useSnackbar";
import AppSnackbar from "./AppSnackbar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FileTable({ files = [], loading, onDeleted, category }) {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { snackbar, showSuccess, showError, closeSnackbar } = useSnackbar();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(
        `${API_URL}/files?category=${category}&filename=${encodeURIComponent(deleteTarget.name)}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail || "Failed to delete the file.");
      }
      showSuccess("File deleted successfully");
      setDeleteTarget(null);
      onDeleted?.();
    } catch (err) {
      showError(err.message || "Something went wrong while deleting.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" alignItems="center" gap={1.5} py={4} px={1}>
        <Typography color="text.secondary" fontSize={14}>Loading files…</Typography>
      </Box>
    );
  }

  if (!files.length) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        py={8}
        gap={1.5}
      >
        <InsertDriveFileOutlinedIcon sx={{ fontSize: 40, color: "text.disabled" }} />
        <Typography color="text.disabled" fontSize={14}>No files found</Typography>
      </Box>
    );
  }

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
              File Name
            </TableCell>
            {files[0]?.type && (
              <TableCell sx={{ fontWeight: 700, color: "text.secondary", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Type
              </TableCell>
            )}
            <TableCell align="right" sx={{ fontWeight: 700, color: "text.secondary", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow
              key={file.name}
              sx={{
                "&:hover": { bgcolor: "rgba(196, 98, 45, 0.04)" },
                transition: "background 0.15s",
              }}
            >
              <TableCell sx={{ fontSize: 13, fontWeight: 500 }}>
                {file.name}
              </TableCell>
              {file.type && (
                <TableCell>
                  <Chip
                    label={file.type === "invoice" ? "Invoice" : file.type === "credit_note" ? "Credit Note" : file.type}
                    size="small"
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor: file.type === "invoice" ? "rgba(196,98,45,0.1)" : "rgba(46,125,50,0.1)",
                      color: file.type === "invoice" ? "#C4622D" : "#2e7d32",
                    }}
                  />
                </TableCell>
              )}
              <TableCell align="right">
                <IconButton
                  size="small"
                  sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
                  onClick={() =>
                    window.open(
                      `${API_URL}/download?category=${category}&filename=${encodeURIComponent(file.name)}`,
                      "_blank"
                    )
                  }
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}
                  onClick={() => setDeleteTarget(file)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* DELETE DIALOG */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberIcon color="warning" />
          Delete file
        </DialogTitle>
        <DialogContent>
          <Typography fontSize={14}>You are about to permanently delete:</Typography>
          <Typography fontWeight={700} mt={1} fontSize={14}>{deleteTarget?.name}</Typography>
          <Typography color="warning.main" mt={2} fontSize={13}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <AppSnackbar snackbar={snackbar} onClose={closeSnackbar} />
    </>
  );
}
