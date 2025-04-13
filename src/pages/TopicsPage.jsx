import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Collapse,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import topicsData from "../data/topics.json";
import { Link as RouterLink } from "react-router-dom";

export default function TopicsPage() {
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = (id) => {
    setExpandedTopic(expandedTopic === id ? null : id);
  };

  const filteredTopics = topicsData.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: "#f9fff9", py: 6 }}>
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#1b5e20", fontWeight: 700 }}
        >
          📚 Тақырыптық сабақтар
        </Typography>

        {/* Search bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Тақырып атауын енгізіңіз..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 4, bgcolor: "#ffffff", borderRadius: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Grid container spacing={8}>
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <Grid item xs={12} sm={6} md={4} key={topic.id}>
                <Card
                  onClick={() => handleToggle(topic.id)}
                  sx={{
                    cursor: "pointer",
                    transition: "0.3s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={topic.cover}
                    alt={topic.title}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {topic.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {topic.description}
                    </Typography>
                  </CardContent>

                  <Collapse
                    in={expandedTopic === topic.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box
                      sx={{
                        px: 2,
                        pb: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Button
                        component={RouterLink}
                        to={`/video/${topic.videoId}`}
                        variant="contained"
                        color="success"
                        fullWidth
                      >
                        🎥 Видео сабақ
                      </Button>
                      <Button
                        component={RouterLink}
                        to={`/task/${topic.taskId}`}
                        variant="outlined"
                        color="primary"
                        fullWidth
                      >
                        📝 Тапсырма
                      </Button>
                      <Button
                        component={RouterLink}
                        to={`/quiz/${topic.quizId}`}
                        variant="outlined"
                        color="secondary"
                        fullWidth
                      >
                        ✅ Тест
                      </Button>
                    </Box>
                  </Collapse>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography textAlign="center" color="text.secondary">
                Нәтиже табылмады 😕
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
