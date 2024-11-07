"use client";
import { useEffect, useState } from "react";
import HomeLoggedIn from "./LoggedIn/page"; // logged-in page component
import HomeNotLoggedIn from "./homepage/page"; // not logged-in page component

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedInCookie = document.cookie.includes("email");
      setIsLoggedIn(loggedInCookie);
    };
    checkLoginStatus();
  }, []);

  return <div>{isLoggedIn ? <HomeLoggedIn /> : <HomeNotLoggedIn />}</div>;
}
