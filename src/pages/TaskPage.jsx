import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  TextField,
  Button,
} from "@mui/material";

export default function TaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const res = await fetch(`/data/tasks/${id}.json`);
        if (!res.ok) throw new Error("Тапсырма табылмады");
        const data = await res.json();
        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  const handleSubmit = () => setSubmitted(true);

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
          📝 {task.title}
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          {task.description}
        </Typography>

        {task.tasks.map((item, index) => (
          <Paper key={index} elevation={2} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {index + 1}. {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              {item.instruction}
            </Typography>

            {/* content — пары */}
            {Array.isArray(item.content) &&
              item.content.length > 0 &&
              typeof item.content[0] === "object" &&
              Array.isArray(item.content[0]) &&
              item.content[0].length === 2 && (
                <ul>
                  {item.content.map(([left, right], i) => (
                    <li key={i}>
                      <strong>{left}</strong> – {right}
                    </li>
                  ))}
                </ul>
            )}

            {/* content — 3-связка */}
            {Array.isArray(item.content) &&
              item.content.length > 0 &&
              typeof item.content[0] === "object" &&
              Array.isArray(item.content[0]) &&
              item.content[0].length === 3 && (
                <ul>
                  {item.content.map(([a, b, c], i) => (
                    <li key={i}>
                      <strong>{a}</strong> → {b} → <em>{c}</em>
                    </li>
                  ))}
                </ul>
            )}

            {/* content — строковый список */}
            {Array.isArray(item.content) &&
              typeof item.content[0] === "string" && (
                <ul>
                  {item.content.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
            )}

            {/* content — пустой */}
            {item.content === "" && (
              <Typography variant="body2" color="text.secondary">
                ✍️ Ашық сұрақ: өз жауабыңызды төменге жазыңыз.
              </Typography>
            )}
          </Paper>
        ))}

        {/* Answer box */}
        <Box component="form" onSubmit={(e) => e.preventDefault()}>
          <TextField
            multiline
            minRows={4}
            fullWidth
            label="Жауабыңызды жазыңыз"
            variant="outlined"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={submitted || response.trim() === ""}
          >
            Жіберу
          </Button>

          {submitted && (
            <Alert severity="success" sx={{ mt: 3 }}>
              ✅ Жауап қабылданды! Рақмет.
            </Alert>
          )}
        </Box>
      </Container>
    </Box>
  );
}
