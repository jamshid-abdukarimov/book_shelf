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
import { login } from "features/login";
import { Alert } from "@mui/material";

const Login = () => {
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const key = data.get("key")?.toString();
    const secret = data.get("secret")?.toString();
    if (key && secret) {
      try {
        await dispatch(login({ key, secret })).unwrap();
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
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="key"
            label="Key"
            type="password"
            id="key"
            autoFocus
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
            Sign In
          </Button>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </Typography>
    </Container>
  );
};

export default Login;
