import { useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import LoginGoogle from "@/components/auth/LoginGoogle";
import useErrorHandler from "@/hooks/useErrorHandler";

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

import styles from "./AuthForm.module.css";

const AuthForm = () => {
  const [signingUp, setSigningUp] = useState(false);
  const login = useUserStore((state) => state.login);
  const signup = useUserStore((state) => state.signup);
  const navigate = useNavigate();
  const { errorAction } = useErrorHandler();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const afterSubmit = (error, res) => {
      if (error) {
        errorAction(res.message);
      } else {
        toast(res.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    };

    const userData = {
      username: data.email,
      email: data.email,
      password: data.password,
    };

    try {
      if (signingUp) {
        signup(userData, afterSubmit);
      } else {
        login(userData, afterSubmit);
      }
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }
  };

  const handleChangeMode = () => {
    setSigningUp(!signingUp);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {signingUp && "Sign up"}
          {!signingUp && "Sign in"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "El email no es válido",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 4,
                message: "El password debe tener al menos 4 caracteres",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {signingUp && "Sign up"}
            {!signingUp && "Sign in"}
          </Button>
        </Box>
        {message && (
          <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
            {message}
          </Alert>
        )}
      </Box>
      <div className={styles.changeMode}>
        {signingUp && (
          <>
            <p>¿Ya tienes una cuenta? </p>
            <a onClick={handleChangeMode}>sign in</a>
          </>
        )}
        {!signingUp && (
          <>
            <p>¿No tienes una cuenta? </p>
            <a onClick={handleChangeMode}>sign up</a>
          </>
        )}
      </div>

      <LoginGoogle />
    </Container>
  );
};

export default AuthForm;
