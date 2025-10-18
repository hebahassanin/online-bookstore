import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import type { RootState} from "../../../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../../Redux/store";
import { logout } from "../../../../Redux/authSlice";




export default function NavBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
 const location= useLocation();

 // logout
 const dispatch= useDispatch<AppDispatch>();
 const handleLogout =()=>{
  dispatch(logout());
  navigate("/");
 }

  const toggleDrawer = (state: boolean) => () => {
    setOpen(state);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navLinks = [
    { text: "HOME", path: "/dashboard" },
    { text: "BOOKS", path: "/dashboard/books" },
    { text: "CATEGORIES", path: "/dashboard/categories" },
  ];
  
  const totalQuantity = useSelector((state: RootState) => {
    return state.cart.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  });

  return (
    <>

     <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ bgcolor: "white", borderBottom: "1px solid #ddd" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Avatar with Menu */}
          <IconButton onClick={handleMenuOpen}>
            {/* <Avatar
              alt="User"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 32, height: 32 }}
            /> */}
            <Avatar src="/broken-image.jpg" />
          </IconButton>

          {/* Middle Section - Links (Hidden on small screens) */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            {navLinks.map((link, index) => (
              <Button
                key={link.text}
                onClick={()=> navigate(link.path)}
                sx={{
                  borderRight: index !== navLinks.length - 1 ? "1px solid #ddd" : "none",
                  borderRadius: 0,
                  paddingRight: "20px",
                  paddingLeft: "20px",
                  textAlign: "center",
                  color: location.pathname === link.path ? "#ef6b4a" : "#333",
                  fontWeight: location.pathname === link.path ? "700" : "500",
                  letterSpacing:"2px",
                  fontSize: "15px"
                }}
                >
                  {link.text}
                {/* <NavLink
                  to={link.path}
                  style={({ isActive }) => ({
                    color: isActive ? "#ef6b4a" : "#333",
                    fontWeight:isActive? "700":"500",
                    letterSpacing: "2px",
                    fontSize: "15px",
                    textDecoration: "none"
                  })}
                >
                  {link.text}
                </NavLink> */}
              </Button>
              
            ))}
          </Box>

          {/* Right Section - Icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Menu button for small screens */}
            <IconButton
              sx={{ color: "#393280",fontSize:"30px", display: { xs: "block", md: "none" } }}
              onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            {/* Cart + Logout icon */}
            <IconButton onClick={()=> navigate("/dashboard/cart")}>
              <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCartOutlinedIcon sx={{fontSize:"30px",color: "#393280"}}/>
              </Badge>
            </IconButton>
            <IconButton onClick={handleLogout} sx={{ color: "#393280", }}>
              <LogoutIcon sx={{fontSize:"30px"}}/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Avatar Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={()=> navigate('/dashboard/profile')}>Profile</MenuItem>
        <MenuItem onClick={()=> navigate('/change-password')} >Change Password</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {/* Drawer for small screens */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}  sx={{color:"#393280",fontSize:"30px"}}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {navLinks.map((link) => (

              <ListItem key={link.text} >
                <ListItemButton onClick={()=> navigate(link.path)}
                sx={{color: location.pathname === link.path ? "#ef6b4a" :"#333",
                fontWeight: location.pathname === link.path ? "700" : "500",
                fontSize: "20px"}}>
                  {link.text}
           
                </ListItemButton>
              </ListItem>


            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
     
    </>
  )
}






