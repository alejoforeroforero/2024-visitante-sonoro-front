import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { changeMode } from "@/redux/states/userSlice";
import { login, signup } from "@/redux/states/userActions";

import { GoogleLogin } from '@react-oauth/google';
import { styled } from '@mui/system';
import GoogleIcon from '@mui/icons-material/Google';


import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

import styles from "./AuthForm.module.css";

const StyledGoogleButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#4285F4',
  color: 'white',
  '&:hover': {
    backgroundColor: '#357ae8',
  },
}));

const AuthForm = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const action = user.signingUp ? signup(data) : login(data);
      dispatch(action);
      setMessage("Operation successful!");
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }
  };

  const handleChangeMode = () => {
    dispatch(changeMode());
  };

   const handleGoogleSuccess = (credentialResponse) => {
    dispatch(loginWithGoogle(credentialResponse));
  };

  const handleGoogleError = () => {
    console.error('Google Sign In was unsuccessful. Try again later');
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
          {user.signingUp && "Sign up"}
          {!user.signingUp && "Sign in"}
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
            {user.signingUp && "Sign up"}
            {!user.signingUp && "Sign in"}
          </Button>
        </Box>
        {message && (
          <Alert severity="success" sx={{ mt: 2, width: "100%" }}>
            {message}
          </Alert>
        )}
      </Box>
      <div className={styles.changeMode}>
        {user.signingUp && (
          <>
            <p>¿Ya tienes una cuenta? </p>
            <a onClick={handleChangeMode}>sign in</a>
          </>
        )}
        {!user.signingUp && (
          <>
            <p>¿No tienes una cuenta? </p>
            <a onClick={handleChangeMode}>sign up</a>
          </>
        )}
      </div>
      <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          render={({ onClick }) => (
            <StyledGoogleButton
              fullWidth
              onClick={onClick}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </StyledGoogleButton>
          )}
        />

      <p className={styles.invalid}>{user.message}</p>
    </Container>
  );
};

export default AuthForm;
