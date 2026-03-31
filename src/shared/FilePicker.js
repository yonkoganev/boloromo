import { Button, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function FilePicker({ file, onFile, accept, multiple = false }) {
  if (!file && !multiple) {
    return (
      <Button
        variant="outlined"
        component="label"
        startIcon={<UploadFileIcon />}
        fullWidth
        sx={{
          borderStyle: "dashed",
          borderColor: "divider",
          py: 1.5,
          color: "text.secondary",
          "&:hover": { borderColor: "primary.main", color: "primary.main" },
        }}
      >
        Choose File
        <input hidden type="file" accept={accept} onChange={(e) => onFile(e.target.files[0])} />
      </Button>
    );
  }

  if (multiple) {
    return (
      <Button
        variant="outlined"
        component="label"
        startIcon={<UploadFileIcon />}
        fullWidth
        sx={{
          borderStyle: "dashed",
          borderColor: "divider",
          py: 1.5,
          color: "text.secondary",
          "&:hover": { borderColor: "primary.main", color: "primary.main" },
        }}
      >
        Choose Files (multiple)
        <input hidden type="file" accept={accept} multiple onChange={(e) => onFile(Array.from(e.target.files))} />
      </Button>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "primary.main",
        borderRadius: 1.5,
        px: 2,
        py: 1,
      }}
    >
      <Typography color="white" fontSize={13} fontWeight={600} noWrap sx={{ maxWidth: "80%" }}>
        {file.name}
      </Typography>
      <IconButton size="small" onClick={() => onFile(null)} sx={{ color: "white" }}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
