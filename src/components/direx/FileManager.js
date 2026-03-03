import { Box, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import FolderTree from "./FolderTree";
import FileTable from "./FileTable";
import UploadReportModal from "./UploadReportModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FileManager() {
  const [selected, setSelected] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  const fetchFiles = () => {
    if (!selected) return;

    setLoading(true);
    fetch(`${API_URL}/files?category=direx`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (f) => f.year === selected.year && f.month === selected.month
        );
        setFiles(filtered);
      })
      .finally(() => setLoading(false));
  };

  useEffect(fetchFiles, [selected]);

  return (
    <>
      <Paper sx={{ height: "80vh", boxShadow: '0px 5px 20px #a9a8a8' }}>
        <Box display="flex" height="100%">
          <Box width={280} borderRight="1px solid #eee" p={2} overflow="scroll">
            <Button
              variant="contained"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => setOpenUpload(true)}
            >
              Upload Direx Report
            </Button>

            <FolderTree onSelect={setSelected} />
          </Box>

          <Box flex={1} p={2} overflow="scroll">
            <FileTable files={files} loading={loading} onDeleted={fetchFiles} />
          </Box>
        </Box>
      </Paper>

      <UploadReportModal
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        onUploaded={fetchFiles}
      />
    </>
  );
}
