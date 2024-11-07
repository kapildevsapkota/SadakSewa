// pages/profile.tsx
"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Header from "../header";

export default function Profile() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userName = Cookies.get("Name");
    const userEmail = Cookies.get("email");

    if (!userEmail) {
      alert("Please log in first");
      router.push("/component/login");
      return;
    }

    setName(userName || "No name set");
    setEmail(userEmail);
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Header />

      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 shadow-md mt-20">
        <nav className="space-y-4">
          {[
            "Home",
            "Personal Info",
            "Data and Privacy",
            "Security",
            "Payments and Subscriptions",
            "About",
          ].map((item) => (
            <a
              key={item}
              href="#"
              className="block text-lg font-medium text-gray-800 hover:text-orange-500 transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Profile Content */}
      <main className="flex-grow p-8 mt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {name || "User"}!
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your information, privacy, and security to make Sadaksewa work
          better for you.
        </p>

        {/* Profile Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-orange-500">
              Personal Information
            </h2>
            <p className="text-gray-600 mt-2">
              Update your profile details and manage account settings.
            </p>
            <button
              onClick={() => router.push("#")}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
            >
              Manage your info
            </button>
          </div>

          {/* Privacy & Personalization Card */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-orange-500">
              Privacy & Personalization
            </h2>
            <p className="text-gray-600 mt-2">
              Review your activity to customize your experience on Sadaksewa.
            </p>
            <button
              onClick={() => router.push("#")}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
            >
              Manage data & privacy
            </button>
          </div>

          {/* Security Tips Card */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-orange-500">
              Security Tips
            </h2>
            <p className="text-gray-600 mt-2">
              Check important security settings to keep your account safe.
            </p>
            <button
              onClick={() => router.push("#")}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
            >
              Review security tips
            </button>
          </div>

          {/* Account Suggestions Card */}
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-semibold text-orange-500">
              Account Suggestions
            </h2>
            <p className="text-gray-600 mt-2">
              Get personalized suggestions to improve your account settings.
            </p>
            <button
              onClick={() => router.push("#")}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-semibold transition duration-200"
            >
              Review suggestions
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
