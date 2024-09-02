"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { registerPushNotifications } from "./pushNotification";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter(); // Initialize router

  useEffect(() => {
    if (typeof window !== "undefined") {
      const myID = localStorage.getItem("myID");
      const myToken = localStorage.getItem("token");
      if (myID || myToken) {
        router.push("/home");
        registerPushNotifications();
      }
    }
  }, [router]);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
