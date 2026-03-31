import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
