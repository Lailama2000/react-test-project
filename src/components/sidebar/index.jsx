import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { People, Message, Logout, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice";

const drawerWidth = 240;

const navItems = [
  { label: "Users", icon: <People />, path: "/users" },
  { label: "Posts", icon: <Message />, path: "/posts" },
  { label: "Logout", icon: <Logout />, path: "/" },
];

export const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [active, setActive] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const drawer = (
    <Box
      sx={{ textAlign: "center", height: "100%", backgroundColor: "#f9f9f9" }}
    >
      <Typography variant="h6" sx={{ my: 3, fontWeight: 600 }}>
        Admin Dashboard
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => {
                if (item.label === "Logout") {
                  handleLogout();
                  setActive(item.label);
                } else {
                  setActive(item.label);
                  navigate(item.path);
                }
              }}
              sx={{
                px: 3,
                py: 1.5,
                backgroundColor: active === item.label ? "#e0e0e0" : "",
                borderRadius:active === item.label ? 2 :'',
                mx: active === item.label ?1 :'',
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                  borderRadius: 2,
                  mx: 1,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 500, fontSize: 15 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          display: { sm: "none" },
          position: "absolute",
          top: 16,
          left: 16,
        }}
      >
        <Menu />
      </IconButton>

      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#f9f9f9",
              borderRight: "1px solid #e0e0e0",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};
