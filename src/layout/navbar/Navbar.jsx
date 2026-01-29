import "./Navbar.css";
import { useState } from "react";
import { AppBar, Box, Toolbar, Stack, Button, useTheme, useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Search from "../../components/search/Search";
import { DropdownSearchInput } from "../../components/filter/SearchDropdown";
import Account from "../../components/account/Account";
import Language from "../../components/language/Language";
import NavCart from "../../components/navCart/NavCart";
import MyDrawer from "../drawer/Drawer";
import Theme from "../../components/theme/Theme";

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

  // Pass theme colors via CSS variables
  const navColors = {
    "--bg": theme.palette.background.BG,
    "--text": theme.palette.text.primary,
  };

  return (
    <div className="nav" style={navColors}>
      <Box className="navbar-wrapper">
        <AppBar position="fixed" className="navbar-appbar">
          <Toolbar className="navbar-toolbar">
            {/* Logo */}
            <Link to="/" className="navbar-logo-link">
              <img src="/images/logo.avif" alt="nelly store" className="navbar-logo-img" />
              {!isMobile && (
                <h1 className="navbar-logo-text">
                  <span className="navbar-logo-highlight">N</span>elly
                </h1>
              )}
            </Link>

            {/* Desktop nav + search */}
            {!isMobile && (
              <Box className="navbar-nav-search">
                <Stack spacing={2} direction="row">
                  {navItems.map(({ label, path }, i) => (
                    <Button key={i} component={Link} to={path} className="navbar-nav-button">
                      {label}
                    </Button>
                  ))}
                </Stack>

                <Box className="navbar-search-box">
                  {isProductsPage ? <Search /> : <DropdownSearchInput backendUrl={backendUrl} />}
                </Box>
              </Box>
            )}

            {/* Right icons */}
            <Box className="navbar-right-icons">
              {!isMobile && (
                <>
                  <Account anchorElAccount={anchorElAccount} setAnchorElAccount={setAnchorElAccount} />
                  <Language anchorElLang={anchorElLang} setAnchorElLang={setAnchorElLang} />
                  <Theme />
                  <NavCart />
                </>
              )}

              {isMobile && (
                <MyDrawer
                  anchorElLang={anchorElLang}
                  anchorElAccount={anchorElAccount}
                  setAnchorElLang={setAnchorElLang}
                  setAnchorElAccount={setAnchorElAccount}
                />
              )}
            </Box>
          </Toolbar>

          {/* Mobile search */}
          {isMobile && (
            <Box className="navbar-mobile-search">
              {isProductsPage ? <Search /> : <DropdownSearchInput backendUrl={backendUrl} />}
            </Box>
          )}
        </AppBar>
      </Box>
    </div>
  );
}
