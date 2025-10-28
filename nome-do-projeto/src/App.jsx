import React, { useMemo, useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import AppRoutes from "@/routes/AppRoutes";
import { createTheme } from "@mui/material/styles";

function App() {
  
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDark ? "dark" : "light");

  
  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));


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
       
        <AppBar
          position="sticky"
          elevation={6}
          sx={{
            background:
              mode === "dark"
                ? "linear-gradient(90deg, #1f1f1f, #2a2a2a)"
                : "linear-gradient(90deg, #2196f3, #6a1b9a)",
            transition: "background 0.6s ease",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ letterSpacing: 0.5 }}
            >
              🧠 Ar-condicionado Inteligente
            </Typography>

            <IconButton
              onClick={toggleTheme}
              color="inherit"
              sx={{
                transition: "transform 0.3s ease",
                "&:hover": { transform: "rotate(25deg)" },
              }}
            >
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        
        <Box sx={{ pt: 4 }}>
          <AppRoutes />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
