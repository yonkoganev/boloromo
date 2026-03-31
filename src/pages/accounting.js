import { useState, useEffect } from "react";
import { Box, Paper, Button } from "@mui/material";
import PageLayout from "../shared/PageLayout";
import FileTable from "../shared/FileTable";
import GenerateModal from "../components/accounting/GenerateModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AccountingPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openGenerate, setOpenGenerate] = useState(false);

  const fetchFiles = () => {
    setLoading(true);
    fetch(`${API_URL}/files?category=final`)
      .then((r) => r.json())
      .then((data) => setFiles(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(fetchFiles, []);

  return (
    <PageLayout title="Final Reports">
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
            onClick={() => setOpenGenerate(true)}
          >
            Generate Accounting
          </Button>
          <FileTable
            files={files}
            loading={loading}
            category="final"
            onDeleted={fetchFiles}
          />
        </Box>
      </Paper>

      <GenerateModal
        open={openGenerate}
        onClose={() => setOpenGenerate(false)}
        onGenerated={fetchFiles}
      />
    </PageLayout>
  );
}
