import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  shape: { borderRadius: 12 },
  palette: {
    primary: {
      main: "#C4622D",
      dark: "#A04E22",
      contrastText: "#fff",
    },
    secondary: {
      main: "#3E1F00",
    },
    background: {
      default: "#FAF8F6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1C0A00",
      secondary: "#6B5044",
    },
  },
  typography: {
    fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 600, textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "8px 18px",
          borderRadius: 10,
          fontWeight: 600,
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #C4622D, #A04E22)",
          boxShadow: "0 2px 8px rgba(196,98,45,0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #D4723D, #C4622D)",
            boxShadow: "0 4px 16px rgba(196,98,45,0.4)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: { "& .MuiOutlinedInput-root": { borderRadius: 10 } },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { borderRadius: 8, margin: "2px 6px" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16 },
      },
    },
  },
});

export default theme;
