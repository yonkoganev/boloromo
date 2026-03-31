import { useState, useEffect } from "react";
import { Box, Paper, Button } from "@mui/material";
import PageLayout from "../shared/PageLayout";
import FileTable from "../shared/FileTable";
import UploadWarehouseModal from "../components/warehouses-data/UploadWarehouseModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function WarehousesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  const fetchFiles = () => {
    setLoading(true);
    fetch(`${API_URL}/files?category=warehouse`)
      .then((r) => r.json())
      .then((data) => setFiles(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(fetchFiles, []);

  return (
    <PageLayout title="Warehouse Files">
      <Paper
        sx={{
          height: "78vh",
          boxShadow: "0px 4px 24px rgba(0,0,0,0.07)",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box p={2.5} height="100%" overflow="auto">
          <Button
            variant="contained"
            sx={{ mb: 2.5 }}
            onClick={() => setOpenUpload(true)}
          >
            Upload Warehouse File
          </Button>
          <FileTable
            files={files}
            loading={loading}
            category="warehouse"
            onDeleted={fetchFiles}
          />
        </Box>
      </Paper>

      <UploadWarehouseModal
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        onUploaded={fetchFiles}
      />
    </PageLayout>
  );
}
