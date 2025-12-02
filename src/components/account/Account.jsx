import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip, useTheme } from "@mui/material";
import { handleMenuClose, handleMenuOpen } from "../../utils/Helper";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Account({ anchorElAccount, setAnchorElAccount }) {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <div>
      <Tooltip title="Account">
        <IconButton
          aria-label="account"
          onClick={(e) => handleMenuOpen(e, setAnchorElAccount)}
          sx={{ color: theme.palette.text.primary }}
        >
          <AccountCircle sx={{ fontSize: "1.3rem" }} />
        </IconButton>
      </Tooltip>
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
    </div>
  );
}
