import { NavLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import "./header.css";
import { Search } from "features/search";
import { logout, selectUser } from "shared/model/auth";
import { useAppDispatch, useAppSelector } from "shared/lib/store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuth = user?.id;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <NavLink className="logo" to="/">
              Book Shelf
            </NavLink>
          </Typography>
          {isAuth && <Search />}
          <Box sx={{ flexGrow: 1 }} />
          {isAuth ? (
            <Box
              className="navigation_links"
              // sx={{ display: { xs: "none", md: "flex" } }}
            >
              <NavLink to="/profile">
                <IconButton size="large">
                  <AccountCircle />
                </IconButton>
              </NavLink>
              <Button onClick={handleLogout}>
                <IconButton style={{ color: "white" }} size="large">
                  <LogoutIcon />
                </IconButton>
              </Button>
            </Box>
          ) : (
            <Box
              sx={{ display: "flex", gap: 2 }}
              className="authorization_links"
            >
              <NavLink to="/signup">
                <Typography variant="subtitle1" color="white">
                  Sign Up
                </Typography>
              </NavLink>
              <NavLink to="/signin">
                <Typography variant="subtitle1" color="white">
                  Sign In
                </Typography>
              </NavLink>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
