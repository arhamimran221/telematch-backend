"use client";
import React, { useEffect, useState } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as SwipeableListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import {
  fetchNotifications,
  acceptNotification,
  snoozeNotification,
} from "../services/api";
import AppLayout from "../layouts/app-layout";
import NotificationCard from "../../components/NotificationCard/NotificationCard";

const HomePage = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchAllNotifications = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    // Fetch notifications initially
    fetchAllNotifications();

    // Set up a polling interval to fetch notifications every 30 seconds
    const intervalId = setInterval(fetchAllNotifications, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleAccept = async (id) => {
    try {
      const acceptedBy = localStorage.getItem("userName");
      await acceptNotification(id, acceptedBy);
      fetchAllNotifications(); // Refresh notifications after action
    } catch (error) {
      console.error("Error accepting notification:", error);
    }
  };

  const handleSnooze = async (id) => {
    try {
      await snoozeNotification(id);
      fetchAllNotifications(); // Refresh notifications after action
    } catch (error) {
      console.error("Error snoozing notification:", error);
    }
  };

  const leadingActions = (id) => (
    <LeadingActions>
      <SwipeAction onClick={() => handleAccept(id)}>
        <div className="bg-[#77AB59] flex justify-center items-center w-[100%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#fff"
            className="size-8 mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (id) => (
    <TrailingActions>
      <SwipeAction destructive={false} onClick={() => handleSnooze(id)}>
        <div className="bg-[#ff2e2e] flex justify-center items-center w-[100%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#fff"
            className="size-8 mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <AppLayout>
      <div>
        <SwipeableList
          listType={SwipeableListType.TYPE_IOS} // Keeps swipe action open
        >
          {notifications.map((notification) => (
            <SwipeableListItem
              key={notification.id} // Unique key for each item
              leadingActions={leadingActions(notification.id)}
              trailingActions={trailingActions(notification.id)}
            >
              <div className="w-[100%]">
                <NotificationCard notification={notification} />
              </div>
            </SwipeableListItem>
          ))}
        </SwipeableList>
      </div>
    </AppLayout>
  );
};

export default HomePage;
