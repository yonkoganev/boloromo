import {
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InventoryIcon from "@mui/icons-material/Inventory";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import BarChartIcon from "@mui/icons-material/BarChart";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import Image from "next/image";
import { grey } from "@mui/material/colors";

const cardStyle = {
  flexGrow: 1,
  cursor: "pointer",
  borderRadius: 3,
  height: 160,
  p: 3,
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
  transition: "all 0.25s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0px 18px 40px rgba(0,0,0,0.25)",
  },
};

export default function IndexPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(null);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate =
    mounted && now
      ? now.toLocaleString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "";

  return (
    <Box px={10} pt={5} sx={{ background: grey[900] }}>
      {/* HEADER */}
      <Box mb={3}>
        <Box mb={3}>
          <Image
            src="/logo.webp"
            alt="Logo"
            width={140}
            height={60}
            style={{
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography variant="h4" color={grey[50]} fontWeight={700}>
          Hello, Angel 👋
        </Typography>
        <Typography color={grey[50]}>
          {formattedDate}
        </Typography>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* ACTION CARDS */}
      <Box
        display="flex"
        gap={4}
        mb={6}
      >
        <Paper
          onClick={() => router.push("/sales-reports")}
          sx={{
            ...cardStyle,
            background: "linear-gradient(135deg, #2196F3, #21CBF3)",
          }}
        >
          <AssessmentIcon sx={{ fontSize: 42 }} />
          <Typography variant="h6" fontWeight={700}>
            Sales Reports
          </Typography>
        </Paper>

        <Paper
          onClick={() => router.push("/direx-reports")}
          sx={{
            ...cardStyle,
            background: "linear-gradient(135deg, #FF9800, #FF5722)",
          }}
        >
          <ReceiptLongIcon sx={{ fontSize: 42 }} />
          <Typography variant="h6" fontWeight={700}>
            Direx Reports
          </Typography>
        </Paper>

        <Paper
          onClick={() => router.push("/warehouses-data")}
          sx={{
            ...cardStyle,
            background: "linear-gradient(135deg, #4CAF50, #2E7D32)",
          }}
        >
          <InventoryIcon sx={{ fontSize: 42 }} />
          <Typography variant="h6" fontWeight={700}>
            Warehouse Files
          </Typography>
        </Paper>
        <Paper
          onClick={() => router.push("/accounting")}
          sx={{
            ...cardStyle,
            background: "linear-gradient(135deg, #00BCD4, #26C6DA)",
          }}
        >
          <FactCheckIcon sx={{ fontSize: 42 }} />
          <Typography variant="h6" fontWeight={700}>
            Final Reports
          </Typography>
        </Paper>
      </Box>
      <Divider />
      {/* QUICK OVERVIEW */}
      <Box my={6}>
        <Typography variant="h6" fontWeight={700} color={grey[50]} mb={3}>
          Quick Overview
        </Typography>

        <Box display="flex" gap={3}>
          {[
            {
              label: "Total Files",
              value: "124",
              icon: <InsertDriveFileIcon />,
            },
            {
              label: "Reports This Month",
              value: "18",
              icon: <BarChartIcon />,
            },
            {
              label: "Last Upload",
              value: "2 hours ago",
              icon: <ScheduleIcon />,
            },
            {
              label: "Finalized Reports",
              value: "Jan 2026",
              icon: <CheckCircleIcon />,
            },
          ].map((item) => (
            <Paper
              key={item.label}
              sx={{
                p: 3,
                gap: 2,
                flexGrow: 1,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                boxShadow: "0px 6px 16px rgba(0,0,0,0.08)",
              }}
            >
              {item.icon}

              <Box>
                <Typography variant="h6" fontWeight={700}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
      {/* RECENT ACTIVITY */}
      <Box py={6}>
        <Typography variant="h6" fontWeight={700} color={grey[50]} mb={3}>
          Recent Activity
        </Typography>

        <Paper
          sx={{
            borderRadius: 2,
            boxShadow: "0px 6px 16px rgba(197, 197, 197, 0.08)",
          }}
        >
          {[
            { text: "Uploaded warehouse_bg.xlsx", time: "14:02" },
            { text: "Finalized Direx Report – Jan 2026", time: "Yesterday" },
            { text: "Downloaded Sales Report", time: "2 days ago" },
          ].map((item, index, arr) => (
            <Box
              key={item.text}
              px={3}
              py={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={index !== arr.length - 1 ? "1px solid #eee" : "none"}
            >
              <Typography>{item.text}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.time}
              </Typography>
            </Box>
          ))}
        </Paper>
      </Box>

    </Box>
  );
}
