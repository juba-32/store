import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Account from "../../components/account/Account";
import Language from "../../components/language/Language";
import Theme from "../../components/theme/Theme";
import NavCart from "../../components/navCart/NavCart";

export default function MyDrawer({
  anchorElLang,
  anchorElAccount,
  setAnchorElLang,
  setAnchorElAccount,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const { t } = useTranslation();
  const navItems = [
    { label: t("navbar.Products"), path: "/products" },
    { label: t("navbar.About"), path: "/about" },
    { label: t("navbar.Contact"), path: "/contact" },
  ];
  return (
    <div>
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
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {navItems.map(({ label, path }, i) => (
              <ListItem key={i} disablePadding onClick={handleDrawerToggle}>
                <ListItemButton component={Link} to={path}>
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}

            <Box sx={{ display: "flex", gap: "10px" }}>
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
          </List>
        </Box>
      </Drawer>
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: theme.palette.text.primary }}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}
    </div>
  );
}
