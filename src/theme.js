import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  shape: {
    borderRadius: 12, // MUI uses px, this equals ~borderRadius: 3
  },
  palette: {
    primary: {
      main: "#1976d2", // MUI blue
    },
    grey: {
      200: "#eeeeee",
      900: "#212121",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "8px 16px", // px:2 py:1 equivalent
          borderRadius: 12,
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "4px 8px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
