import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Stack,
  Button,
  Badge,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LanguageIcon from "@mui/icons-material/Language";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Theme from "../theme/Theme";
import Search from "../search/Search";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const qty = useSelector((state) => state.cart.qty);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event, setter) => {
    setter(event.currentTarget);
  };

  const handleMenuClose = (setter) => {
    setter(null);
  };

  const navItems = [
    { label: t("navbar.Products"), path: "/product" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: theme.palette.background.BG }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile && (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{ color: theme.palette.text.primary }}
                aria-label={drawerOpen ? "Close menu" : "Open menu"}
              >
                {drawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}

            <Link to="/">
              <img
                style={{ width: "50px", height: "50px", borderRadius:"50%" }}
                src={Logo}
                alt="logo"
              />
            </Link>

            {!isMobile && (
              <Stack spacing={2} direction="row">
                {navItems.map(({ label, path }, i) => (
                  <Button
                    key={i}
                    component={Link}
                    to={path}
                    sx={{
                      textTransform: "capitalize",
                      fontSize: ".9rem",
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                        backgroundColor: alpha(theme.palette.success.main, 0.1),
                      },
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Stack>
            )}
          </Box>

          {/* Desktop Search */}
          {!isMobile && <Search />}

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Account">
              <IconButton
                aria-label="account"
                onClick={(e) => handleMenuOpen(e, setAnchorElAccount)}
                sx={{ color: theme.palette.text.primary }}
              >
                <AccountCircle sx={{ fontSize: "1.3rem" }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Language">
              <IconButton
                aria-label="language"
                onClick={(e) => handleMenuOpen(e, setAnchorElLang)}
                sx={{ color: theme.palette.text.primary }}
              >
                <LanguageIcon sx={{ fontSize: "1.3rem" }} />
              </IconButton>
            </Tooltip>

            <Theme />

            <Tooltip title="Cart">
              <Link to="/cart">
                <IconButton
                  aria-label="cart"
                  sx={{ color: theme.palette.text.primary }}
                >
                  <Badge
                    badgeContent={qty}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "10px",
                        height: "16px",
                        minWidth: "16px",
                        padding: "0 4px",
                      },
                    }}
                  >
                    <ShoppingCartIcon sx={{ fontSize: "1.3rem" }} />
                  </Badge>
                </IconButton>
              </Link>
            </Tooltip>
          </Box>
        </Toolbar>

        {/* Mobile Search */}
        {isMobile && (
          <Box sx={{ px: 2, py: 1 }}>
            <Search />
          </Box>
        )}
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 250,
          },
        }}
      >
        <Box>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", px: 1, pt: 1 }}
          >
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navItems.map(({ label, path }, i) => (
              <ListItem key={i} disablePadding onClick={handleDrawerToggle}>
                <ListItemButton component={Link} to={path}>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Account Dropdown */}
      <Menu
        anchorEl={anchorElAccount}
        open={Boolean(anchorElAccount)}
        onClose={() => handleMenuClose(setAnchorElAccount)}
      >
        <MenuItem onClick={() => handleMenuClose(setAnchorElAccount)}>
          <Link
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
              textTransform: "capitalize",
            }}
            to={"/register"}
          >
            {t("signup.sign up")}
          </Link>
        </MenuItem>
      </Menu>

      {/* Language Dropdown */}
      <Menu
        anchorEl={anchorElLang}
        open={Boolean(anchorElLang)}
        onClose={() => handleMenuClose(setAnchorElLang)}
      >
        <MenuItem
          onClick={() => {
            i18n.changeLanguage("en");
            handleMenuClose(setAnchorElLang);
          }}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => {
            i18n.changeLanguage("ar");
            handleMenuClose(setAnchorElLang);
          }}
        >
          العربية
        </MenuItem>
      </Menu>
    </Box>
  );
}
