import "./Button.css";
import Btn from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
export default function Button({ link = "/" }) {
  return (
    <div>
      <Btn
        component={RouterLink}
        to={link}
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
          fontWeight: "bold",
          letterSpacing: "2px",
          cursor: "pointer",
          transition: "all ease 0.5s",
          border: "2px solid #000",

          "&:hover": {
            transform: "scale(.9)",
          },
        }}
      >
        shop now
      </Btn>
    </div>
  );
}
