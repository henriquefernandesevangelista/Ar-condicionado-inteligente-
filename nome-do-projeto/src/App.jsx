import React, { useMemo, useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  useMediaQuery,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import AppRoutes from "@/routes/AppRoutes";
import Navbar from "@/components/Navbar";

function App() {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDark ? "dark" : "light");

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#9c27b0" },
          background: {
            default:
              mode === "dark"
                ? "linear-gradient(135deg, #0d1117, #1e1e1e)"
                : "linear-gradient(135deg, #e3f2fd, #f8f9fa)",
          },
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: "'Inter', 'Roboto', sans-serif",
        },
        transitions: {
          duration: { enteringScreen: 400, leavingScreen: 400 },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: theme.palette.background.default,
          backgroundAttachment: "fixed",
          transition: "background 0.6s ease, color 0.6s ease",
          color: theme.palette.text.primary,
        }}
      >
        <Navbar mode={mode} toggleTheme={toggleTheme} />

        <Box sx={{ pt: 4 }}>
          <AppRoutes />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
