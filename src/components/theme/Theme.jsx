import { createTheme, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../redux/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      default: "#000",
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
      btnBG: "#76ff03",
      btnBGC: "#f50057",
      BG: "#fff",
    },
    text: {
      primary: "#111",
      secondary: "#666",
    },
    customColor: {
      main: "#ff9800",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      default: "#fff",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#222",
      btnBG: "#43a047",
      btnBGC: "#e91e63",
      BG: "#000",
    },
    text: {
      primary: "#fff",
      secondary: "#bbb",
    },
    customColor: {
      main: "#ffeb3b",
    },
  },
});

export default function Theme() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.cart?.darkMode);

  return (
    <IconButton
      onClick={() => dispatch(setMode())}
      sx={{
        borderRadius: "50px",
        width: "40px",
        height: "40px",
        color: isDarkMode ? "cyan" : "#ff9800",
        transition: "all 0.3s ease",
        "&:hover": {
          background: isDarkMode ? "rgba(0, 255, 255, 0.1)" : "rgba(255, 152, 0, 0.1)",
          borderColor: isDarkMode ? "cyan" : "#ff9800",
          transform: "scale(1.05)",
        },
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ display: "flex" }}
          >
            <NightsStayIcon style={{ fontSize: "22px" }} />
          </motion.div>
        ) : (
          <motion.div
            key="sunny"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ display: "flex" }}
          >
            <WbSunnyIcon style={{ fontSize: "22px" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </IconButton>
  );
}