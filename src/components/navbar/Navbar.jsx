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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            gap: 2,
          }}
        >
          {/* left logo */}
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
            {!isMobile && (
              <h1 style={{ fontSize: "20px" }}>
                <span style={{ color: "#ff3c5f" }}>N</span>elly
              </h1>
            )}
          </Link>

          {/* Nav Items + Search (desktop) */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
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

              {/* large screen ___ search inline with navItems */}
              <Box sx={{ minWidth: "220px" }}>
                {isProductsPage ? (
                  <Search />
                ) : (
                  <DropdownSearchInput backendUrl={backendUrl} />
                )}
              </Box>
            </Box>
          )}

          {/* right icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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

        {/* mobile search at the bottom of the navbae */}
        {isMobile && (
          <Box sx={{ px: 2, pb: 1 }}>
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
