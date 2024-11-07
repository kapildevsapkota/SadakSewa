"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);

        // Set cookie with the email
        Cookies.set("email", email, { expires: 7, path: "/" }); // expires in 7 days
        Cookies.set("Name", data.user.name, { expires: 7, path: "/" });
        alert("You have successfully logged In.");

        router.push("/component/LoggedIn");
      } else {
        alert(data.message); //
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 to-orange-500 p-6">
      <div className="bg-white rounded-lg shadow-lg p-12 flex flex-col md:flex-row items-center md:w-3/5 lg:w-2/5 max-w-4xl">
        {/* Logo and Image Section */}
        <Link href={"/component/homepage"}>
          <div className=" flex justify-center mb-8 md:mb-0">
            <Image src="/logo.png" alt="Logo" width={200} height={200} />
          </div>
        </Link>

        {/* Login Form Section */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Member Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v1l9 4 9-4zM2 11v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8l-9 4-9-4z" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-12 pr-4 py-4 border rounded-lg text-lg focus:outline-none focus:border-orange-500"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2a6 6 0 0 1 6 6v4h1.5a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20.5v-7A1.5 1.5 0 0 1 4.5 12H6V8a6 6 0 0 1-6-6zm-3 6v4h6V8a3 3 0 1 0-6 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  className="w-full pl-12 pr-4 py-4 border rounded-lg text-lg focus:outline-none focus:border-orange-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-200"
            >
              LOGIN
            </button>
          </form>

          <div className="flex justify-between mt-8 text-md text-gray-500">
            <Link href="/forgot-password" className="hover:underline">
              Forgot Username / Password?
            </Link>
            <Link href="/component/register" className="hover:underline">
              Create your Account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
