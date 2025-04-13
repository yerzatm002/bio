// src/components/Navbar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #1b5e20, #4caf50)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            fontWeight={600}
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            BioEdu8
          </Typography>
          <Box>
            <Button color="inherit" component={RouterLink} to="/" sx={{ mx: 1 }}>
              Басты бет
            </Button>
            <Button color="inherit" component={RouterLink} to="/topics" sx={{ mx: 1 }}>
              Тақырыптық сабақтар
            </Button>
            <Button color="inherit" component={RouterLink} to="/achievements" sx={{ mx: 1 }}>
              Жетістіктер
            </Button>
            <Button color="inherit" component={RouterLink} to="/feedback" sx={{ mx: 1 }}>
              Кері байланыс
            </Button>
            <Button color="inherit" component={RouterLink} to="/games" sx={{ mx: 1 }}>
              Ойындар
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
