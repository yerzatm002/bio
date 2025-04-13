import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";

export default function AchievementsPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("quizResults") || "{}");
    const entries = Object.entries(stored).map(([id, data]) => ({
      id,
      ...data
    }));
    setResults(entries);
  }, []);

  return (
    <Box sx={{ bgcolor: "#f9fff9", py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom sx={{ color: "#1b5e20", fontWeight: 700 }}>
          🏆 Жетістіктер
        </Typography>

        {results.length === 0 ? (
          <Typography color="text.secondary">Әлі ешбір тест тапсырылмаған.</Typography>
        ) : (
          <TableContainer component={Paper} elevation={2} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>№</TableCell>
                  <TableCell>Тақырып</TableCell>
                  <TableCell align="center">Балл</TableCell>
                  <TableCell align="center">Максимум</TableCell>
                  <TableCell align="center">Уақыты</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((res, idx) => (
                  <TableRow key={res.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>{res.title}</TableCell>
                    <TableCell align="center">{res.score}</TableCell>
                    <TableCell align="center">{res.total}</TableCell>
                    <TableCell align="center">
                      {new Date(res.timestamp).toLocaleString("kk-KZ", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}
