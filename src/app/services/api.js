import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api"; // Use the appropriate base URL

// Fetch notifications
export const fetchNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// Accept a notification
export const acceptNotification = async (id, acceptedBy) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/notifications/${id}/accept`,
      {
        acceptedBy: acceptedBy,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error accepting notification:", error);
    throw error;
  }
};

// Snooze a notification
export const snoozeNotification = async (id) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/notifications/${id}/snooze`
    );
    return response.data;
  } catch (error) {
    console.error("Error snoozing notification:", error);
    throw error;
  }
};
