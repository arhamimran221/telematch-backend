// services/api.js

import axios from "axios";

const API_BASE_URL = "https://telematch-backend.vercel.app/api"; // Update this with your actual API base URL

// Function to create a new notification
export const createNotification = async (notificationData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/notifications`,
      notificationData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};
