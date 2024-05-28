import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockRounded";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container/Container";
import CircularProgress from "@mui/material/CircularProgress";

import { useAppDispatch, useAppSelector } from "shared/lib/store";
import {
  selectUserError,
  selectUserLoading,
} from "shared/model/auth/selectors";
import { register } from "features/register";
import { Alert } from "@mui/material";

const Register = () => {
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const key = data.get("key");
    const secret = data.get("secret");
    const newData = {
      name: `${name}`,
      email: `${email}`,
      key: `${key}`,
      secret: `${secret}`,
    };
    if (newData.name && newData.email && newData.key && newData.secret) {
      try {
        await dispatch(register(newData)).unwrap();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.messageError}
        </Alert>
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="text"
            id="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="key"
            label="Key"
            type="password"
            id="key"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="secret"
            label="Secret"
            type="password"
            id="secret"
          />
          <Button
            startIcon={loading ? <CircularProgress size={20} /> : null}
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center">
        If you have an account already. <Link to="/signup">Sign Up</Link>
      </Typography>
    </Container>
  );
};

export default Register;
