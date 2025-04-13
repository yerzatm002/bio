// src/pages/VideoPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";

export default function VideoPage() {
  const { id } = useParams(); 
  console.log(id)
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const res = await fetch(`/data/tasks/${id}.json`);
        if (!res.ok) throw new Error("Видео табылмады");
        const data = await res.json();
        setVideo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f9fff9", py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom sx={{ color: "#1b5e20", fontWeight: 700 }}>
          🎥 {video.title}
        </Typography>

        <Paper elevation={3} sx={{ mt: 3, mb: 5, overflow: "hidden" }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%", // 16:9
            }}
          >
            <iframe
              src={video.videoUrl}
              title={video.title}
              frameBorder="0"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          </Box>
        </Paper>

        <Typography variant="body1" color="text.secondary">
          {video.description}
        </Typography>
      </Container>
    </Box>
  );
}
