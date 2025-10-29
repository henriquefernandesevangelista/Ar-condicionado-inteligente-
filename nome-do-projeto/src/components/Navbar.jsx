import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function Navbar({ mode, toggleTheme }) {
  return (
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
  );
}

export default Navbar;