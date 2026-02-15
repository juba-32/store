import { useState } from "react";
import { Button, Switch, FormControlLabel, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Input from "../input/Input";
import { signupUser, loginUser } from "../../api/auth";
import { saveToken, saveUser } from "../../utils/Helper";

import "./Register.css";

export default function Register() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialFormData = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Toggle Login/Signup
  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setFormData(initialFormData);
    setError("");
  };

  // handle form inputs
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Signup Validation
    if (mode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        return setError("Passwords do not match");
      }
    }

    try {
      setLoading(true);

      if (mode === "login") {
        const data = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        saveToken(data.token);
        saveUser(data.user);
        navigate("/");
      } else {
        const data = await signupUser({
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
        });

        saveToken(data.token);
        saveUser(data.user);
        navigate("/");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError("Cannot connect to server");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="register-page"
      style={{
        "--bg": theme.palette.background.default,
        "--text": theme.palette.text.primary,
        "--muted": theme.palette.text.secondary,
        "--error": theme.palette.error.main,
      }}
    >
      <div className="register-card">
        <h2 className="register-title">
          {mode === "login" ? t("signup.Welcome Back!") : t("signup.sign up")}
        </h2>

        {/* Switch */}
        <FormControlLabel
          control={<Switch checked={mode === "signup"} onChange={toggleMode} />}
          label={
            mode === "login"
              ? t("signup.Need an account")
              : t("signup.already have account")
          }
          className="register-switch"
        />

        {/* Form */}
        <form className="register-form" onSubmit={handleSubmit}>
          {/* Full Name */}
          {mode === "signup" && (
            <Input
              fullWidth
              required
              id="fullname"
              label={t("signup.full name")}
              value={formData.fullname}
              onChange={handleChange}
            />
          )}

          {/* Email */}
          <Input
            fullWidth
            required
            id="email"
            label={t("signup.email")}
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password */}
          <Input
            fullWidth
            required
            type="password"
            id="password"
            label={t("signup.password")}
            value={formData.password}
            onChange={handleChange}
          />

          {/* Confirm Password */}
          {mode === "signup" && (
            <Input
              fullWidth
              required
              type="password"
              id="confirmPassword"
              label={t("signup.confirm Password")}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          )}

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? t("signup.log in")
                : t("signup.sign up")}
          </Button>

          {/* Error */}
          {error && <p className="register-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}
