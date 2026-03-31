import { Box, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import FolderTree from "./FolderTree";
import FileTable from "./FileTable";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Generic FileManager with folder tree.
 * Props:
 *   category        - API category string
 *   treeMode        - FolderTree mode
 *   filterFn        - function(file, selected) → bool
 *   uploadLabel     - button label
 *   onUploadClick   - callback to open upload modal
 *   uploadModal     - the modal component (already rendered)
 */
export default function TreeFileManager({
  category,
  treeMode,
  filterFn,
  uploadLabel,
  onUploadClick,
  uploadModal,
}) {
  const [selected, setSelected] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = () => {
    if (!selected) return;
    setLoading(true);
    fetch(`${API_URL}/files?category=${category}`)
      .then((r) => {
        if (!r.ok) throw new Error(`API error: ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setFiles(arr.filter((f) => filterFn(f, selected)));
      })
      .catch(() => setFiles([]))
      .finally(() => setLoading(false));
  };

  useEffect(fetchFiles, [selected]);

  return (
    <>
      <Paper
        sx={{
          height: "78vh",
          boxShadow: "0px 4px 24px rgba(0,0,0,0.07)",
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box display="flex" height="100%">
          {/* LEFT TREE */}
          <Box
            width={260}
            borderRight="1px solid"
            borderColor="divider"
            p={2}
            overflow="auto"
            sx={{ bgcolor: "#FDFCFB" }}
          >
            <Button
              variant="contained"
              fullWidth
              sx={{ mb: 2 }}
              onClick={onUploadClick}
            >
              {uploadLabel}
            </Button>
            <FolderTree onSelect={setSelected} mode={treeMode} />
          </Box>

          {/* RIGHT TABLE */}
          <Box flex={1} p={2} overflow="auto">
            <FileTable
              files={files}
              loading={loading}
              category={category}
              onDeleted={fetchFiles}
            />
          </Box>
        </Box>
      </Paper>
      {uploadModal}
    </>
  );
}
