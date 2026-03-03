import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import FileManager from "../components/warehouses-data/FileManager";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

export default function WarehousesPage() {
  const router = useRouter();

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" mb={3}>
        <Button startIcon={<KeyboardBackspaceRoundedIcon />} onClick={() => router.push("/")}>
          Back
        </Button>
        <Typography variant="h5">Warehouse Data</Typography>
      </Box>
      <FileManager />
    </Box>
  );
}
