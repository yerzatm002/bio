import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Paper
} from "@mui/material";

export default function FeedbackPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Box sx={{ bgcolor: "#f9fff9", py: 6 }}>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom sx={{ color: "#1b5e20", fontWeight: 700 }}>
          📩 Кері байланыс
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Мұғалімге сұрақ қойыңыз немесе пікір қалдырыңыз. Біз жауап береміз!
        </Typography>

        <Paper elevation={3} sx={{ p: 4 }}>
          {!submitted ? (
            <>
              <TextField
                fullWidth
                required
                label="Аты-жөніңіз"
                name="name"
                value={form.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Электрон поштa (міндетті емес)"
                name="email"
                value={form.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                required
                multiline
                rows={5}
                label="Хабарламаңыз"
                name="message"
                value={form.message}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={!form.name || !form.message}
              >
                Жіберу
              </Button>
            </>
          ) : (
            <Alert severity="success" sx={{ mt: 2 }}>
              ✅ Хабарламаңыз қабылданды! Рақмет.
            </Alert>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
