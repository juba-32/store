import "./Drawer.css";
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
import Account from "../navbar/account/Account";
import Language from "../navbar/language/Language";
import Theme from "../theme/Theme";
import NavCart from "../navbar/navCart/NavCart";

export default function MyDrawer({
  anchorElLang,
  anchorElAccount,
  setAnchorElLang,
  setAnchorElAccount,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { label: t("navbar.Products"), path: "/products" },
    { label: t("navbar.About"), path: "/about" },
    { label: t("navbar.Contact"), path: "/contact" },
  ];



  return (
    <div >
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          className: "drawer-paper",
        }}
      >
        <Box className="drawer-container">
          <Box className="drawer-close">
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon sx={{color:"cyan"}} />
            </IconButton>
          </Box>

          <List className="drawer-list">
            {navItems.map(({ label, path }, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton
                  component={Link}
                  to={path}
                  onClick={() => setDrawerOpen(false)}
                  className="drawer-link"
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box className="drawer-actions">
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
        </Box>
      </Drawer>

      {isMobile && (
        <IconButton
          onClick={() => setDrawerOpen(true)}
          className="drawer-menu-btn"
        >
          <MenuIcon />
        </IconButton>
      )}
    </div>
  );
}