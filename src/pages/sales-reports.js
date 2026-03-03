import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import FileManager from "../components/sales-reports/FileManager";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

export default function DirexReportsPage() {
  const router = useRouter();

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" mb={3}>
        <Button startIcon={<KeyboardBackspaceRoundedIcon />} onClick={() => router.push("/")}>
          Back
        </Button>
        <Typography variant="h5">Sales Reports</Typography>
      </Box>
      <FileManager />
    </Box>
  );
}
