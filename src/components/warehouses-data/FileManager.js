import { Box, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import FileTable from "./FileTable";
import UploadWarehouseModal from "./UploadWarehouseModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  const fetchFiles = () => {
    setLoading(true);
    fetch(`${API_URL}/files?category=warehouse`)
      .then((res) => res.json())
      .then((data) => setFiles(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(fetchFiles, []);

  return (
    <>
      <Paper sx={{ height: "80vh", boxShadow: '0px 5px 20px #a9a8a8' }}>
        <Box p={2} height="100%" overflow="auto">
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setOpenUpload(true)}
          >
            Upload Warehouse File
          </Button>

          <FileTable
            files={files}
            loading={loading}
            onDeleted={fetchFiles}
          />
        </Box>
      </Paper>

      <UploadWarehouseModal
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        onUploaded={fetchFiles}
      />
    </>
  );
}
