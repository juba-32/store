import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { handleMenuClose, handleMenuOpen } from "../../../utils/Helper";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
export default function Language({ anchorElLang, setAnchorElLang }) {
    const { i18n } = useTranslation();
  return (
    <div>
      <Tooltip title="Language">
        <IconButton
          aria-label="language"
          onClick={(e) => handleMenuOpen(e, setAnchorElLang)}
          sx={{ color: "cyan" }}
        >
          <LanguageIcon sx={{ fontSize: "1.3rem" }} />
        </IconButton>
      </Tooltip>
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
    </div>
  );
}
