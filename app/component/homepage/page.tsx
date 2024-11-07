"use client";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import Header from "../header";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState(""); // State for notification
  const router = useRouter(); // Initialize the router

  const handleBookNowClick = () => {
    setNotification("You should log in or register first.");

    setTimeout(() => {
      router.push("/component/login");
    }, 2000);
  };

  return (
    <div>
      <Head>
        <title>Sadaksewa - Fast Aid, Right Away!</title>
        <meta
          name="description"
          content="Reliable roadside assistance services in Nepal."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
        <Image
          src="/image.png" // Replace with your image path
          alt="Overlay Image"
          layout="fill"
          className="absolute opacity-50"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
          }}
        />

        <div className="relative z-10 text-center p-4">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-2">
            Fast Aid, Right Away!
          </h1>
          <p className="text-lg md:text-xl text-black mb-4">
            Reliable roadside assistance services in Nepal.
          </p>
          <button
            onClick={handleBookNowClick}
            className="mt-4 inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
          >
            Book Now
          </button>
          {notification && (
            <div className="mt-4 p-2 bg-red-500 text-white rounded-md">
              {notification}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
