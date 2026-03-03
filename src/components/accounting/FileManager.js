import { Box, Paper, Button } from "@mui/material";
import { useEffect, useState } from "react";
import FileTable from "./FileTable";
import GenerateModal from "./GenerateModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openGenerate, setOpenGenerate] = useState(false);

  const fetchFiles = () => {
    setLoading(true);
    fetch(`${API_URL}/files?category=final`)
      .then((res) => res.json())
      .then(setFiles)
      .finally(() => setLoading(false));
  };

  useEffect(fetchFiles, []);

  return (
    <>
      <Paper sx={{ height: "80vh", boxShadow: "0px 5px 20px #a9a8a8" }}>
        <Box p={2}>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
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
    </>
  );
}
