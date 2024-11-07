"use client";
import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { IoPerson } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Header from "../header";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter(); // Initialize the router directly
  const isLoggedIn = true; // Replace with your actual login state

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBookNowClick = () => {
    // Navigate to the application form page
    router.push("/component/application");
  };

  const handleLogout = () => {
    console.log("Logged out");
    router.push("/"); // Redirect to home page
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

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-md py-4 z-50">
          <nav className="flex flex-col items-center space-y-4">
            <a href="#home" className="text-gray-700 hover:text-orange-600">
              Home
            </a>
            <a href="#services" className="text-gray-700 hover:text-orange-600">
              Services
            </a>
            <a href="#about" className="text-gray-700 hover:text-orange-600">
              About
            </a>
            {isLoggedIn ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="text-gray-700">
                  <IoPerson className="h-8 w-8 cursor-pointer" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="#about"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      About
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={"/component/login"}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}

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
        </div>
      </main>
    </div>
  );
}
