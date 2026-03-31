import {
  Box, Typography, Paper, Divider, Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import Image from "next/image";
import { useEffect, useState } from "react";

const NAV_CARDS = [
  {
    label: "Sales Reports",
    href: "/sales-reports",
    icon: AssessmentIcon,
    gradient: "linear-gradient(135deg, #C4622D 0%, #E8824E 100%)",
    desc: "Upload & manage marketplace sales exports",
  },
  {
    label: "Direx Reports",
    href: "/direx-reports",
    icon: ReceiptLongIcon,
    gradient: "linear-gradient(135deg, #3E1F00 0%, #6B3A1F 100%)",
    desc: "Manage delivery cost reports",
  },
  {
    label: "Warehouse Files",
    href: "/warehouses-data",
    icon: InventoryIcon,
    gradient: "linear-gradient(135deg, #8B4513 0%, #C4622D 100%)",
    desc: "BG warehouse & TAROS price lists",
  },
  {
    label: "Amazon Documents",
    href: "/amazon-documents",
    icon: DescriptionIcon,
    gradient: "linear-gradient(135deg, #5C2E00 0%, #8B4513 100%)",
    desc: "Invoices & credit notes from Amazon",
  },
  {
    label: "Final Reports",
    href: "/accounting",
    icon: FactCheckIcon,
    gradient: "linear-gradient(135deg, #A04E22 0%, #C4622D 100%)",
    desc: "Generate & download accounting reports",
  },
];

export default function IndexPage() {
  const router = useRouter();
  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formattedDate = now?.toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }) ?? "";

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(160deg, #1C0A00 0%, #3E1F00 50%, #1C0A00 100%)",
      }}
    >
      {/* TOP HEADER */}
      <Box
        px={{ xs: 4, md: 8 }}
        pt={5}
        pb={4}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src="/logo.webp" alt="Boloromo" width={150} height={64} style={{ objectFit: "contain" }} />
        <Box textAlign="right">
          <Typography color="rgba(255,255,255,0.5)" fontSize={12}>
            {formattedDate}
          </Typography>
        </Box>
      </Box>

      {/* HERO */}
      <Box px={{ xs: 4, md: 8 }} pb={6}>
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: 800,
            mb: 0.5,
          }}
        >
          Hello, Angel 👋
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: 15 }}>
          Welcome to the Boloromo accounting dashboard
        </Typography>
      </Box>

      {/* CONTENT AREA */}
      <Box
        sx={{
          background: "#FAF8F6",
          borderRadius: "32px 32px 0 0",
          minHeight: "70vh",
          px: { xs: 4, md: 8 },
          pt: 5,
          pb: 8,
        }}
      >
        <Typography variant="h6" fontWeight={800} color="text.primary" mb={3}>
          Quick Access
        </Typography>

        {/* CARDS GRID */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr 1fr", md: "repeat(5, 1fr)" }}
          gap={3}
          mb={6}
        >
          {NAV_CARDS.map(({ label, href, icon: Icon, gradient, desc }) => (
            <Paper
              key={href}
              onClick={() => router.push(href)}
              elevation={0}
              sx={{
                cursor: "pointer",
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 32px rgba(196,98,45,0.15)",
                  borderColor: "primary.main",
                },
              }}
            >
              {/* Gradient top bar */}
              <Box sx={{ background: gradient, height: 6 }} />
              <Box p={2.5}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.5,
                  }}
                >
                  <Icon sx={{ color: "white", fontSize: 22 }} />
                </Box>
                <Typography fontWeight={700} fontSize={14} mb={0.5}>
                  {label}
                </Typography>
                <Typography fontSize={12} color="text.secondary" lineHeight={1.4}>
                  {desc}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h6" fontWeight={800} color="text.primary" mb={2}>
          Getting Started
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          {[
            { step: "1", text: "Upload sales report from marketplace" },
            { step: "2", text: "Upload Direx delivery cost report" },
            { step: "3", text: "Upload Amazon invoices & credit notes" },
            { step: "4", text: "Generate final accounting report" },
          ].map(({ step, text }) => (
            <Box
              key={step}
              display="flex"
              alignItems="center"
              gap={1.5}
              sx={{
                px: 2, py: 1.5,
                borderRadius: 2,
                bgcolor: "rgba(196,98,45,0.06)",
                border: "1px solid rgba(196,98,45,0.15)",
              }}
            >
              <Box
                sx={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "linear-gradient(135deg, #C4622D, #A04E22)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Typography fontSize={12} fontWeight={800} color="white">{step}</Typography>
              </Box>
              <Typography fontSize={13} fontWeight={500} color="text.primary">{text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
