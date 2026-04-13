import { Box, Typography, Button, Divider } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InventoryIcon from "@mui/icons-material/Inventory";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import DescriptionIcon from "@mui/icons-material/Description";
import ArticleIcon from "@mui/icons-material/Article";

const NAV_ITEMS = [
  { label: "Sales Reports",    href: "/sales-reports",    icon: <AssessmentIcon fontSize="small" /> },
  { label: "Direx Reports",    href: "/direx-reports",    icon: <ReceiptLongIcon fontSize="small" /> },
  { label: "Warehouse Files",  href: "/warehouses-data",  icon: <InventoryIcon fontSize="small" /> },
  { label: "Amazon Documents", href: "/amazon-documents", icon: <DescriptionIcon fontSize="small" /> },
  { label: "Temu Documents",   href: "/temu-documents",   icon: <ArticleIcon fontSize="small" /> },
  { label: "Final Reports",    href: "/accounting",       icon: <FactCheckIcon fontSize="small" /> },
];

export default function PageLayout({ title, children }) {
  const router = useRouter();

  return (
    <Box display="flex" minHeight="100vh" sx={{ bgcolor: "#FAF8F6" }}>
      {/* SIDEBAR */}
      <Box
        sx={{
          width: 240,
          minHeight: "100vh",
          bgcolor: "#1C0A00",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <Box px={3} pt={3} pb={2}>
          <Image
            src="/logo.webp"
            alt="Boloromo"
            width={130}
            height={55}
            style={{ objectFit: "contain" }}
          />
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mx: 2 }} />

        {/* Nav */}
        <Box flex={1} px={2} py={2} display="flex" flexDirection="column" gap={0.5}>
          {NAV_ITEMS.map((item) => {
            const active = router.pathname === item.href;
            return (
              <Box
                key={item.href}
                onClick={() => router.push(item.href)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1.2,
                  borderRadius: 2,
                  cursor: "pointer",
                  bgcolor: active ? "rgba(196,98,45,0.2)" : "transparent",
                  color: active ? "#E8824E" : "rgba(255,255,255,0.55)",
                  borderLeft: active ? "3px solid #C4622D" : "3px solid transparent",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: "rgba(196,98,45,0.12)",
                    color: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                {item.icon}
                <Typography fontSize={13} fontWeight={active ? 700 : 500}>
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Back to home */}
        <Box px={2} pb={3}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />
          <Box
            onClick={() => router.push("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.2,
              borderRadius: 2,
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
              transition: "all 0.15s ease",
              "&:hover": { color: "rgba(255,255,255,0.8)" },
            }}
          >
            <KeyboardBackspaceRoundedIcon fontSize="small" />
            <Typography fontSize={13} fontWeight={500}>Home</Typography>
          </Box>
        </Box>
      </Box>

      {/* MAIN CONTENT */}
      <Box ml="240px" flex={1} p={4}>
        <Box mb={4}>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              background: "linear-gradient(135deg, #C4622D, #3E1F00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </Box>

        {children}
      </Box>
    </Box>
  );
}
