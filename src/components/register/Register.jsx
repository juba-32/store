import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/Config";
import Input from "../../reusable component/input/Input";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const [firebaseError, setFirebaseError] = useState(false);
  const [mode, setMode] = useState("login");
  const initialFormData = {
    fullname: "",
    email: "",
    password: "",
    createpassword: "",
    repeatpassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      mode === "signup" &&
      formData.createpassword !== formData.repeatpassword
    ) {
      setHasError(true);
      setFirebaseError("Passwords do not match");
      return;
    }

    if (mode === "login") {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then(() => {
          setFormData(initialFormData);
          navigate("/");
        })
        .catch((error) => {
          setHasError(true);
          switch (error.code) {
            case "auth/invalid-credential":
              setFirebaseError("Invalid Email or Password");
              break;
            default:
              setFirebaseError("Login failed");
              break;
          }
        });
    } else {
      createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.createpassword
      )
        .then(() => {
          setFormData(initialFormData);
          setMode("login");
        })
        .catch((error) => {
          setHasError(true);
          switch (error.code) {
            case "auth/email-already-in-use":
              setFirebaseError("Email already in use");
              break;
            case "auth/invalid-email":
              setFirebaseError("Invalid email");
              break;
            case "auth/weak-password":
              setFirebaseError("Password is too weak");
              break;
            default:
              setFirebaseError("Signup failed");
              break;
          }
        });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.5s ease",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 350,
          bgcolor: "background.paper",
          textAlign: "center",
          borderRadius: 2,
          boxShadow: 6,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "text.primary" }}>
          {mode === "login" ? t("signup.Welcome Back!") : t("signup.sign up")}
        </Typography>

        <FormControlLabel
          control={<Switch checked={mode === "signup"} onChange={toggleMode} />}
          label={
            mode === "login"
              ? t("signup.already have account")
              : t("signup.Need an account")
          }
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
            "& .MuiFormControlLabel-label": {
              fontSize: "0.85rem",
              color: "text.secondary",
            },
          }}
        />

        <Box component="form" onSubmit={handleSubmit}>
          {mode === "login" ? (
            <>
              <Input
                fullWidth
                required
                type="text"
                id="email"
                label={t("signup.email")}
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                fullWidth
                required
                type="password"
                id="password"
                label={t("signup.password")}
                value={formData.password}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <Input
                fullWidth
                required
                id="fullname"
                label={t("signup.full name")}
                value={formData.fullname}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <Input
                fullWidth
                required
                id="email"
                label={t("signup.email")}
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <Input
                fullWidth
                required
                type="password"
                id="createpassword"
                label={t("signup.password")}
                value={formData.createpassword}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <Input
                fullWidth
                required
                type="password"
                id="repeatpassword"
                label={t("signup.confirm Password")}
                value={formData.repeatpassword}
                onChange={handleChange}
              />
            </>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary.contrastText"
            sx={{ mt: 3, py: 1.5, fontWeight: "bold" }}
          >
            {mode === "login" ? t("signup.log in") : t("signup.sign up")}
          </Button>

          {hasError && (
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                p: 1,
                borderRadius: 1,
                bgcolor: "error.light",
                color: "error.contrastText",
              }}
            >
              {firebaseError}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
