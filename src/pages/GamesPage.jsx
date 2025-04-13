import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";

export default function GamesPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const res = await fetch("/data/interactive-games.json");
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Game list error:", err);
      }
    };

    loadGames();
  }, []);

  return (
    <Box sx={{ bgcolor: "#f9fff9", py: 6 }}>
      <Container>
        <Typography variant="h4" gutterBottom sx={{ color: "#1b5e20", fontWeight: 700 }}>
          🎮 Білім беру ойындары
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Биология бойынша қызықты онлайн-ойындар мен симуляциялар арқылы біліміңізді бекітіңіз.
        </Typography>

        <Grid container spacing={4}>
          {games.map((game) => (
            <Grid item xs={12} md={6} key={game.id}>
              <Card elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {game.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {game.description}
                  </Typography>

                  <Box sx={{ mb: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {game.topics.map((topic, i) => (
                      <Chip key={i} label={topic} size="small" color="success" />
                    ))}
                  </Box>

                  <Divider sx={{ mb: 1 }} />
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    🎯 Мақсаттар:
                  </Typography>
                  <List dense disablePadding>
                    {game.goals.map((goal, i) => (
                      <ListItem key={i} disableGutters>
                        <ListItemText primary={`• ${goal}`} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    size="medium"
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ойнау
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
