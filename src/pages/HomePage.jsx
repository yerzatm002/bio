import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HomePage() {
  return (
    <Box>


      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "#f9fff9",
          py: { xs: 6, md: 10 },
          px: 4,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <Box maxWidth="600px">
          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
            sx={{ color: "#1b5e20" }}
          >
            8-сынып биологиясына қош келдіңіз!
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={3}>
            Интерактивті платформа – видео, тапсырмалар, тесттер және ойындар арқылы білім ал!
          </Typography>
          <Box>
            <Button
              variant="contained"
              size="large"
              sx={{ mr: 2 }}
              component={RouterLink}
              to="/topics"
            >
              Оқуды бастау
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={RouterLink}
              to="/games"
            >
              Ойындар бөлімі
            </Button>
          </Box>
        </Box>
        <Box
          component="img"
          src="https://www.mgpu.ru/wp-content/uploads/2020/02/b6QiBfIMbI.jpg"
          alt="Биология көрнекі иллюстрация"
          title="Biology visual illustration"
          sx={{
            width: "100%",
            maxWidth: 420,
            borderRadius: 4,
            boxShadow: 3,
          }}
        />
      </Box>

      {/* About Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1b5e20" }}>
          📘 Жоба туралы
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="md">
          <strong>BioEdu8</strong> — бұл 8-сынып оқушыларына арналған биология пәнін заманауи форматта меңгеруге арналған интерактивті білім беру платформасы.
          Сабақтар бейне, тест, тапсырма және ойын арқылы толық қамтылады.
        </Typography>

        <Typography variant="h5" mt={6} gutterBottom sx={{ color: "#388e3c" }}>
          👤 Автор туралы
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="md">
          Ерзат Мейрамбекұлы – цифрлық білім беру мен биологияны біріктіріп жүрген педагог және веб-әзірлеуші.
        </Typography>
      </Container>

{/* Features Section – Simple List */}
<Box sx={{ bgcolor: "#f1f8e9", py: 10 }}>
  <Container maxWidth="md">
    <Typography
      variant="h4"
      sx={{
        color: "#1b5e20",
        fontWeight: "bold",
        textAlign: "center",
        mb: 4,
      }}
    >
      🧪 Платформа мүмкіндіктері
    </Typography>

    <Box component="ul" sx={{ pl: 3, fontSize: 18, color: "#424242" }}>
      <Box component="li" sx={{ mb: 2 }}>
        🎥 <strong>Видео сабақтар:</strong> Қысқа әрі нақты түсіндірулер мен анимациялар арқылы білім беру.
      </Box>
      <Box component="li" sx={{ mb: 2 }}>
        📝 <strong>Тапсырмалар:</strong> Сәйкестендіру, реттілікпен орналастыру, тәжірибелік жұмыс.
      </Box>
      <Box component="li" sx={{ mb: 2 }}>
        ✅ <strong>Тесттер:</strong> Автоматты тексерілетін сұрақтар арқылы білімді бекіту.
      </Box>
      <Box component="li" sx={{ mb: 2 }}>
        🎮 <strong>Ойындар:</strong> Қызықты симуляциялар, викториналар, drag-drop ойындар.
      </Box>
    </Box>
  </Container>
</Box>

    </Box>
  );
}
