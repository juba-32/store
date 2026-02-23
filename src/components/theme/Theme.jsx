import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../redux/cartSlice";
import { useTheme } from "@mui/material";

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
  const m = useTheme();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.cart?.darkMode);
  return (
    <div>
      <FormGroup>
        <FormControlLabel
          label=""
          control={
            <Switch
              inputProps={{
                "aria-label": "Toggle dark mode",
              }}
              sx={{
                "& .MuiSwitch-thumb": {
                  fontSize: "1rem",
                  width: "16px",
                  height: "16px",
                  marginTop: "2px",
                },
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "cyan",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: m.palette.text.primary,
                },
                "& .MuiSwitch-switchBase": {
                  color: "cyan",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: m.palette.text.primary,
                },
              }}
              checked={theme || false}
              onChange={() => dispatch(setMode())}
            />
          }
        />
      </FormGroup>
    </div>
  );
}
