"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "../header";
import {
  FaCar,
  FaBatteryFull,
  FaGasPump,
  FaToolbox,
  FaTruck,
  FaHandHoldingWater,
  FaBolt,
  FaMotorcycle,
} from "react-icons/fa";

export default function Services() {
  const services = [
    {
      title: "Car Lockout",
      description:
        "Trusted vehicle lockout technicians are available around the clock to help vehicle owners or drivers retrieve keys locked in their car.",
      icon: <FaCar size={40} className="text-orange-500 mx-auto" />,
      problemType: "Car Lockout",
    },
    {
      title: "Jump Start",
      description:
        "Nearby qualified battery technicians are available to perform automotive battery jump starts.",
      icon: <FaBatteryFull size={40} className="text-orange-500 mx-auto" />,
      problemType: "Jump Start",
    },
    {
      title: "Gas Delivery",
      description:
        "Fast rescue technicians arrive with two gallons of gasoline so your customer can make it to a gas station to refuel.",
      icon: <FaGasPump size={40} className="text-orange-500 mx-auto" />,
      problemType: "Gas Delivery",
    },
    {
      title: "Tire Change",
      description:
        "In the event of a flat tire, our flat tire service comes to your customer and installs a spare.",
      icon: <FaToolbox size={40} className="text-orange-500 mx-auto" />,
      problemType: "Tire Change",
    },
    {
      title: "Towing",
      description:
        "Urgently quickly finds and dispatches an available, local, qualified tow truck driver directly to your customer’s disabled vehicle.",
      icon: <FaTruck size={40} className="text-orange-500 mx-auto" />,
      problemType: "Towing",
    },
    {
      title: "Stuck In Ditch & Winch Services",
      description:
        "Urgently winching services assist with freeing vehicles stuck in a ditch, mud, or snow.",
      icon: (
        <FaHandHoldingWater size={40} className="text-orange-500 mx-auto" />
      ),
      problemType: "Stuck In Ditch & Winch Services",
    },
    {
      title: "Electric Vehicle Towing",
      description: "24/7/365 Safe, convenient, and reliable towing for EVs.",
      icon: <FaBolt size={40} className="text-orange-500 mx-auto" />,
      problemType: "Electric Vehicle Towing",
    },
    {
      title: "Motorcycle Towing",
      description: "Safe, convenient, and reliable towing for motorcycles.",
      icon: <FaMotorcycle size={40} className="text-orange-500 mx-auto" />,
      problemType: "Motorcycle Towing",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="pt-20 p-4">
        <h1 className="text-3xl font-bold text-center mb-6 pt-10">
          Our Services
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={{
                pathname: "/component/application",
                query: { problemType: service.problemType },
              }}
              className="bg-white p-6 rounded-lg shadow-md text-center block"
            >
              <div className="mb-4">{service.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-700">{service.description}</p>
            </Link>
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
