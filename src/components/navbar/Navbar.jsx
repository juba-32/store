import "./Navbar.css";
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Search from "../navbar/search/Search";
import Account from "../navbar/account/Account";
import Language from "../navbar/language/Language";
import NavCart from "./navCart/NavCart";
import MyDrawer from "../drawer/Drawer";
import Theme from "../theme/Theme";
import { motion } from "framer-motion";
import FavIcon from "./favoriteIcon/FavIcon";

export default function Navbar({ backendUrl }) {
  const location = useLocation();
  const isProductsPage = location.pathname.startsWith("/product");

  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);


  const navItems = [
    { label: t("navbar.Products"), path: "/products" },
    { label: t("navbar.About"), path: "/about" },
    { label: t("navbar.Contact"), path: "/contact" },
  ];

  const navColors = {
    "--bg": theme.palette.background.default,
    "--card-bg": theme.palette.background.paper,
    "--text": theme.palette.text.primary,
    "--border": theme.palette.divider,
  };

  return (
    <div className="nav" style={navColors}>
      <Box className="navbar-wrapper">
        <AppBar position="fixed" className="navbar-appbar" elevation={0}>
          <Toolbar className="navbar-toolbar">
            {/* LEFT: LOGO */}
            <NavLink to="/" className="navbar-logo-NavLink">
              <img
                src="/images/logo.avif"
                alt="nelly store"
                className="navbar-logo-img"
              />
              {!isMobile && (
                <h1 className="navbar-logo-text">
                  <motion.span
                    key={t.language}
                    style={{
                      color: "cyan",
                      fontWeight: 700,
                      display: "inline-block",
                    }}
                    animate={{ y: [3, -3, 3] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {t("navbar.logoName")}
                  </motion.span>
                  <span className="full-logo-text">
                    {t("navbar.fullLogoName")}
                  </span>
                </h1>
              )}
            </NavLink>

            {!isMobile && (
              <Box className="navbar-center-menu">
                <Stack
                  spacing={1}
                  direction="row"
                  className="navbar-links-stack"
                >
                  {navItems.map(({ label, path }, i) => (
                    <Button
                      key={i}
                      component={NavLink}
                      to={path}
                      className="navbar-nav-button"
                    >
                      {label}
                    </Button>
                  ))}
                </Stack>

                <Box className="navbar-search-box">
                  <Search
                    mode={isProductsPage ? "products" : "global"}
                    backendUrl={backendUrl}
                  />
                </Box>
              </Box>
            )}

            <Box className="navbar-right-icons">
              {!isMobile && (
                <>
                  <Account
                    anchorElAccount={anchorElAccount}
                    setAnchorElAccount={setAnchorElAccount}
                  />
                  <Language
                    anchorElLang={anchorElLang}
                    setAnchorElLang={setAnchorElLang}
                  />
                  <Theme />
                  <NavCart />
                  <FavIcon />
                </>
              )}

              {isMobile && (
                <>
                  <Account />
                  <Theme />
                  <FavIcon />
                  <NavCart />
                  <MyDrawer
                    anchorElLang={anchorElLang}
                    anchorElAccount={anchorElAccount}
                    setAnchorElLang={setAnchorElLang}
                    setAnchorElAccount={setAnchorElAccount}
                  />
                </>
              )}
            </Box>
          </Toolbar>

          {isMobile && (
            <Box className="navbar-search-mobile-wrapper">
              <Box className="navbar-search-box">
                <Search
                  mode={isProductsPage ? "products" : "global"}
                  backendUrl={backendUrl}
                />
              </Box>
            </Box>
          )}
        </AppBar>
      </Box>
    </div>
  );
}
