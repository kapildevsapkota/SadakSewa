// app/register/page.tsx
"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });

      console.log(response); // Check the response
      if (response.status === 201) {
        router.push("/");
      } else {
        setError(response.data.message || "Failed to register");
      }
    } catch (err: any) {
      console.error(err); // Log the error for more detail
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-300 to-orange-500 p-6">
      <div className="bg-white rounded-lg shadow-lg p-12 flex flex-col md:flex-row items-center md:w-3/5 lg:w-2/5 max-w-4xl">
        <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
          <Image src="/logo.png" alt="Logo" width={200} height={200} />
        </div>
        <div className="md:w-1/2 w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Create Account
          </h2>
          <form onSubmit={handleRegister} className="space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div>
              <input
                type="text"
                className="w-full pl-4 pr-4 py-4 border rounded-lg text-lg focus:outline-none focus:border-orange-500"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                className="w-full pl-4 pr-4 py-4 border rounded-lg text-lg focus:outline-none focus:border-orange-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-4 pr-10 py-4 border rounded-lg text-lg focus:outline-none focus:border-orange-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full pl-4 pr-10 py-4 border rounded-lg text-lg focus:outline-none focus:border-orange-500"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-200"
            >
              SIGN UP
            </button>
          </form>
          <div className="flex justify-center mt-8 text-md text-gray-500">
            <Link
              href="/component/login"
              className="ml-2 text-blue-600 hover:underline"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
