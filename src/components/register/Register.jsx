import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Input from "../../reusable component/input/Input";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Firebase auth lazy-loaded
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    import("../../firebase/Config").then((module) => setAuth(module.auth));
  }, []);

  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    createpassword: "",
    repeatpassword: "",
  });

  const [hasError, setHasError] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  // Auto-hide errors after 5 seconds
  useEffect(() => {
    if (hasError) {
      const timer = setTimeout(() => setHasError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [hasError]);

  const toggleMode = () => setMode(mode === "login" ? "signup" : "login");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const isFormValid = () => {
    if (!formData.email || !formData.password) return false;
    if (mode === "signup" && formData.createpassword !== formData.repeatpassword) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth) return; // wait for Firebase to load

    if (mode === "signup" && formData.createpassword !== formData.repeatpassword) {
      setHasError(true);
      setFirebaseError(t("signup.passwords do not match"));
      return;
    }

    try {
      if (mode === "login") {
        await import("firebase/auth").then(({ signInWithEmailAndPassword }) =>
          signInWithEmailAndPassword(auth, formData.email, formData.password)
        );
        setFormData({
          fullname: "",
          email: "",
          password: "",
          createpassword: "",
          repeatpassword: "",
        });
        navigate("/");
      } else {
        await import("firebase/auth").then(({ createUserWithEmailAndPassword }) =>
          createUserWithEmailAndPassword(auth, formData.email, formData.createpassword)
        );
        setFormData({
          fullname: "",
          email: "",
          password: "",
          createpassword: "",
          repeatpassword: "",
        });
        setMode("login");
      }
    } catch (error) {
      setHasError(true);
      switch (error.code) {
        case "auth/email-already-in-use":
          setFirebaseError(t("signup.email already in use"));
          break;
        case "auth/invalid-email":
          setFirebaseError(t("signup.invalid email"));
          break;
        case "auth/weak-password":
          setFirebaseError(t("signup.password too weak"));
          break;
        case "auth/wrong-password":
        case "auth/user-not-found":
          setFirebaseError(t("signup.invalid credentials"));
          break;
        default:
          setFirebaseError(t("signup.action failed"));
          break;
      }
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
          label={mode === "login" ? t("signup.already have account") : t("signup.Need an account")}
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
            "& .MuiFormControlLabel-label": { fontSize: "0.85rem", color: "text.secondary" },
          }}
        />

        <Box component="form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <Input fullWidth required id="fullname" label={t("signup.full name")} value={formData.fullname} onChange={handleChange} sx={{ mb: 2 }} />
              <Input fullWidth required id="createpassword" type="password" label={t("signup.password")} value={formData.createpassword} onChange={handleChange} sx={{ mb: 2 }} />
              <Input fullWidth required id="repeatpassword" type="password" label={t("signup.confirm Password")} value={formData.repeatpassword} onChange={handleChange} sx={{ mb: 2 }} />
            </>
          )}

          <Input
            fullWidth
            required
            type="text"
            id="email"
            label={t("signup.email")}
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          {mode === "login" && (
            <Input
              fullWidth
              required
              type="password"
              id="password"
              label={t("signup.password")}
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          )}

          <Button type="submit" fullWidth variant="contained" color="primary.contrastText" sx={{ mt: 3, py: 1.5, fontWeight: "bold" }} disabled={!isFormValid() || !auth}>
            {mode === "login" ? t("signup.log in") : t("signup.sign up")}
          </Button>

          {hasError && (
            <Typography
              variant="body2"
              sx={{ mt: 2, p: 1, borderRadius: 1, bgcolor: "error.light", color: "error.contrastText" }}
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
