import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { changeMode } from "@/redux/states/userSlice";
import { login, signup, signout } from "@/redux/states/userActions";
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
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorAction } = useErrorHandler();

  useEffect(() => {
    dispatch(signout(null));
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const afterSave = (error, res) => {
      if (error) {
        errorAction(res.message);
      } else {
        toast(res.message);
        setTimeout(() => {
          navigate('/')
        }, 3000);
        //dispatch(getUserInfo());
      }
    };

    const dataObj = {
      user: {
        username: data.email,
        email: data.email,
        password: data.password,
      },
      callback: afterSave,
    };

    try {
      const action = user.signingUp ? signup(dataObj) : login(dataObj);
      dispatch(action);
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }
  };

  const handleChangeMode = () => {
    dispatch(changeMode());
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

      <p className={styles.invalid}>{user.message}</p>

      <LoginGoogle />
    </Container>
  );
};

export default AuthForm;
