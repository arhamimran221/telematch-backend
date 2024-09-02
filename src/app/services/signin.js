// services/api.js
import axios from "axios";

const API_BASE_URL = "https://telematch-backend.vercel.app/api/auth"; // Use HTTP if HTTPS is not configured

export const signInUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};
