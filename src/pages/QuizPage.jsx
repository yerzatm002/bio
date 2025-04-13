import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from "@mui/material";
import { useParams } from "react-router-dom";

export default function QuizPage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const res = await fetch(`/data/tasks/${id}.json`);
        if (!res.ok) throw new Error("Тест табылмады");
        const data = await res.json();
        setQuiz(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [id]);

  const handleSelect = (qIndex, optionIndex) => {
    if (!submitted) {
      setAnswers({ ...answers, [qIndex]: optionIndex });
    }
  };

  const getResult = () => {
    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswerIndex) correct++;
    });
    return correct;
  };

  const saveResult = () => {
    const score = getResult();
    const total = quiz.questions.length;
    const result = {
      title: quiz.title,
      score,
      total,
      timestamp: new Date().toISOString()
    };

    const prev = JSON.parse(localStorage.getItem("quizResults") || "{}");
    prev[id] = result;
    localStorage.setItem("quizResults", JSON.stringify(prev));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    saveResult();
  };

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
          ✅ {quiz.title} – Тест
        </Typography>

        {quiz.questions.map((q, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{ p: 3, mb: 4, borderLeft: "5px solid #66bb6a" }}
          >
            <Typography variant="h6" gutterBottom>
              {index + 1}. {q.question}
            </Typography>
            <RadioGroup
              value={answers[index] ?? ""}
              onChange={(e) => handleSelect(index, parseInt(e.target.value))}
            >
              {q.options.map((opt, i) => {
                const isCorrect = submitted && i === q.correctAnswerIndex;
                const isWrong = submitted && answers[index] === i && i !== q.correctAnswerIndex;
                return (
                  <FormControlLabel
                    key={i}
                    value={i}
                    control={<Radio />}
                    label={opt}
                    sx={{
                      bgcolor: isCorrect
                        ? "#e8f5e9"
                        : isWrong
                        ? "#ffebee"
                        : undefined,
                      px: 2,
                      borderRadius: 1
                    }}
                  />
                );
              })}
            </RadioGroup>
          </Paper>
        ))}

        {!submitted ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Тексеру
          </Button>
        ) : (
          <Alert severity="success" sx={{ mt: 4 }}>
            ✅ Дұрыс жауаптар саны: <strong>{getResult()}</strong> / {quiz.questions.length}
          </Alert>
        )}
      </Container>
    </Box>
  );
}
