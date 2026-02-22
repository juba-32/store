import "./Button.css";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Btn({ onClick }) {
  const { t } = useTranslation();

  return (
    <div onClick={onClick}>
      <Button
        component={RouterLink}
        variant="outlined"
        sx={{
          fontFamily: "sans-seraf",
          display: "inline-block",
          color: "#000",
          background: "#fff",
          textDecoration: "none",
          padding: "5px 15px",
          borderRadius: "10px",
          fontSize: "1.1rem",
          letterSpacing: "2px",
          cursor: "pointer",
          transition: "all ease 0.5s",

          "&:hover": {
            transform: "scale(.9)",
            color: "cyan !important",
            boxShadow: "0 0 5px cyan",
          },
        }}
      >
        {t("hero.shop now")}
      </Button>
    </div>
  );
}
