import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUser, logoutUser, handleMenuOpen, handleMenuClose } from "../../../utils/Helper";

export default function Account({ anchorElAccount, setAnchorElAccount }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = getUser();

  const handleLogout = () => {
    logoutUser();
    handleMenuClose(setAnchorElAccount);
    navigate("/register");
  };

  return (
    <div>
      <Tooltip title={user ? "Profile" : "log in"}>
        <IconButton
          aria-label="account"
          onClick={(e) => handleMenuOpen(e, setAnchorElAccount)}
          sx={{ color: "cyan" }}
        >
          <AccountCircle sx={{ fontSize: "1.3rem" }} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorElAccount}
        open={Boolean(anchorElAccount)}
        onClose={() => handleMenuClose(setAnchorElAccount)}
      >
        {user ? [
          <MenuItem key="user-name" sx={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {user.fullname}
          </MenuItem>,
          
          <MenuItem key="user-orders" onClick={() => { navigate("/orders"); handleMenuClose(setAnchorElAccount); }}>
            {t("orders")}
          </MenuItem>,
          
          <MenuItem key="user-logout" onClick={handleLogout}>
            {t("logout")}
          </MenuItem>
        ] : (
          <MenuItem onClick={() => handleMenuClose(setAnchorElAccount)}>
            <Link
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
                textTransform: "capitalize",
              }}
              to={"/register"}
            >
              {t("signup.log in")}
            </Link>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}