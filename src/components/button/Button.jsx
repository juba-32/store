import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Btn({
  onClick,
  to,
  variant = "primary", // "primary" | "secondary"
}) {
  const { t } = useTranslation();

  const isPrimary = variant === "primary";

  return (
    <Button
      component={to ? RouterLink : "button"}
      to={to}
      onClick={onClick}
      sx={{
        padding: "12px 40px",
        borderRadius: "16px",
        fontWeight: "bold",
        letterSpacing: "2px",
        fontSize: "1rem",
        textTransform: "capitalize",
        transition: "all 0.3s ease",
        backdropFilter: "blur(10px)",

        ...(isPrimary
          ? {
              background: "cyan",
              color: "#000",
              boxShadow: "0 0 20px cyan",
              border: "none",
              "&:hover": {
                transform: "scale(0.95)",
                boxShadow: "0 0 35px cyan",
                background: "cyan",
              },
            }
          : {
              background: "transparent",
              color: "cyan",
              border: "1px solid cyan",
              "&:hover": {
                transform: "scale(0.95)",
                background: "cyan",
                color: "#000",
                boxShadow: "0 0 25px cyan",
              },
            }),
      }}
    >
      {t("hero.shop now")}
    </Button>
  );
}