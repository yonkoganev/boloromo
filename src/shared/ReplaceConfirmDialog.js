import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export default function ReplaceConfirmDialog({ open, onClose, onConfirm, fileName }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmberIcon color="warning" />
        Replace existing file?
      </DialogTitle>
      <DialogContent>
        {fileName && (
          <Typography fontSize={14}>
            A file named <b>{fileName}</b> already exists.
          </Typography>
        )}
        <Typography mt={1} fontSize={14}>
          Uploading will <b>replace the existing file</b>.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="warning" variant="contained" onClick={onConfirm}>
          Replace
        </Button>
      </DialogActions>
    </Dialog>
  );
}
