import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const AuthForm = () => {
  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 48, color: "text.secondary" }} />
        <Typography component="h1" variant="h5" fontWeight={600}>
          Inicio de sesión no disponible
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 320 }}>
          Esta función no se encuentra disponible por el momento. Vuelve a intentarlo más adelante.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Volver
        </Button>
      </Box>
    </Container>
  );
};

export default AuthForm;
