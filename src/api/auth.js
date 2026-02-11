import axios from "axios";

const API_URL = "https://node-api-projects.vercel.app/api/auth";

// Signup request
export const signupUser = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data;
};

// Login request
export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};
