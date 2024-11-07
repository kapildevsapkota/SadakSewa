// pages/about.tsx
"use client";
import Link from "next/link";
import Header from "../header";
import {
  FaHandsHelping,
  FaShieldAlt,
  FaUsers,
  FaHeadset,
} from "react-icons/fa";

export default function About() {
  const aboutSections = [
    {
      title: "Our Mission",
      description:
        "Sadaksewa is dedicated to providing reliable and accessible roadside assistance services, ensuring peace of mind for our users wherever they are. We strive to connect you with trusted professionals to address emergencies efficiently and effectively.",
      icon: <FaHandsHelping size={40} className="text-orange-500 mx-auto" />,
    },
    {
      title: "Safety & Trust",
      description:
        "Your safety is our priority. We only partner with vetted, experienced professionals to guarantee that each service is performed with the utmost care and quality standards.",
      icon: <FaShieldAlt size={40} className="text-orange-500 mx-auto" />,
    },
    {
      title: "Community-Driven",
      description:
        "We are more than just a service provider; we're part of the community. We aim to build a reliable support network that users can count on in times of need.",
      icon: <FaUsers size={40} className="text-orange-500 mx-auto" />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions or concerns, providing a personal touch to your experience with Sadaksewa.",
      icon: <FaHeadset size={40} className="text-orange-500 mx-auto" />,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="pt-20 p-4">
        <h1 className="text-3xl font-bold text-center mb-6 pt-10">
          About Sadaksewa
        </h1>
        <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-8">
          Sadaksewa is committed to providing quick, reliable, and safe roadside
          assistance to ensure that our users have peace of mind while on the
          road. With our professional network and dedicated support, we aim to
          be there whenever you need help.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {aboutSections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="mb-4">{section.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p className="text-gray-700">{section.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
          >
            Go Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
