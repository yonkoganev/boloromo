import { useRouter } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import FileManager from "../components/accounting/FileManager";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

export default function AccountingPage() {
  const router = useRouter();

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" mb={3}>
        <Button startIcon={<KeyboardBackspaceRoundedIcon />} onClick={() => router.push("/")}>
          Back
        </Button>
        <Typography variant="h5">Accounting Reports</Typography>
      </Box>
      <FileManager />
    </Box>
  );
}
