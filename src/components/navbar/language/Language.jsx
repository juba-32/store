import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import {
  handleMenuClose,
  handleMenuOpen,
} from "../../../utils/Helper";

export default function Language({
  anchorElLang,
  setAnchorElLang,
}) {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);

    localStorage.setItem("language", lang);

    document.documentElement.dir =
      lang === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = lang;

    handleMenuClose(setAnchorElLang);
  };

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
          selected={i18n.language === "en"}
          onClick={() => changeLanguage("en")}
        >
          English
        </MenuItem>

        <MenuItem
          selected={i18n.language === "ar"}
          onClick={() => changeLanguage("ar")}
        >
          العربية
        </MenuItem>
      </Menu>
    </div>
  );
}