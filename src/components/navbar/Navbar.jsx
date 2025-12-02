import { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Theme from "../theme/Theme";
import { useTranslation } from "react-i18next";
import Search from "../search/Search";
import { DropdownSearchInput } from "../filter/SearchDropdown";
import Account from "../account/Account";
import Language from "../language/Language";
import NavCart from "../navCart/NavCart";
import MyDrawer from "../drawer/Drawer";
export default function Navbar({ backendUrl }) {
  const location = useLocation();
  const isProductsPage = location.pathname.startsWith("/product");
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [anchorElLang, setAnchorElLang] = useState(null);

  const navItems = [
    { label: t("navbar.Products"), path: "/product" },
    { label: t("navbar.About"), path: "/about" },
    { label: t("navbar.Contact"), path: "/contact" },
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 2 : 15,
            }}
          >
            {isMobile ? <MyDrawer/> : ""}
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              <img
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                src="/images/logo.webp"
                alt="nelly store"
              />
              <h1 style={{ fontSize: "20px" }}>
                <span style={{ color: "#ff3c5f" }}>N</span>elly
              </h1>
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
                      fontFamily: "sans-serif",
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
          {!isMobile && (
            <Box sx={{ px: 2, py: 1 }}>
              {isProductsPage ? (
                <Search />
              ) : (
                <DropdownSearchInput backendUrl={backendUrl} />
              )}
            </Box>
          )}
          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
          </Box>
        </Toolbar>
        {/* Mobile Search */}
        {isMobile && (
          <Box sx={{ px: 2, py: 1 }}>
            {isProductsPage ? (
              <Search />
            ) : (
              <DropdownSearchInput backendUrl={backendUrl} />
            )}
          </Box>
        )}
      </AppBar>
    </Box>
  );
}
