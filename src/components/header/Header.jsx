"use client";
import { createNotification } from "../../app/services/create-notification";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [notificationData, setNotificationData] = useState({
    header: "",
    body: "",
  });

  const handleChange = (e) => {
    setNotificationData({
      ...notificationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createNotification(notificationData);
      console.log("Notification created:", result);
      setOpen(!open);
      // Optionally reset form or show success message
    } catch (err) {
      console.error("Error creating notification:", err);
    }
  };

  const handleOpen = () => setOpen(!open);

  return (
    <header className="bg-[#f3edf7] px-4 py-6 shadow-md rounded-b-lg flex items-center justify-between fixed top-[0px] w-full z-[9999]">
      <Typography variant="h4" className="font-poppins ">
        Telematch
      </Typography>
      <Popover>
        <PopoverHandler>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
              clipRule="evenodd"
            />
          </svg>
        </PopoverHandler>
        <PopoverContent>
          <button className="border-none outline-none" onClick={handleOpen}>
            Create notification
          </button>
        </PopoverContent>
      </Popover>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Create a notification</DialogHeader>
        <DialogBody>
          <form className="mt-[10px] mb-2 w-full max-w-screen-lg sm:w-96 flex flex-col gap-[20px]">
            {/* Input fields for notification data */}

            <Input
              size="lg"
              placeholder="Enter Header for the Message"
              name="header" // Changed 'name' to 'username'
              value={notificationData.header}
              onChange={handleChange}
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 mb-4`}
            />
            <Textarea
              size="lg"
              placeholder="Enter Content for the Message"
              name="body" // Changed 'name' to 'username'
              value={notificationData.body}
              onChange={handleChange}
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 mb-4`}
            />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Create Notification</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </header>
  );
};

export default Header;
