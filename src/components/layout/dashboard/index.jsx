import React from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../../sideBar";

const drawerWidth = 240; 

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { sm: `${drawerWidth}px` }, 
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
