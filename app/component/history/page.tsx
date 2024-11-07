"use client";
import Header from "../header";
import { FaClock, FaCheckCircle } from "react-icons/fa";

export default function History() {
  // Hardcoded service history data for display only
  const history = [
    {
      title: "Car Lockout",
      description: "Assisted in unlocking a car for the user.",
      date: "2024-11-06 14:30",
    },
    {
      title: "Jump Start",
      description: "Performed a battery jump start.",
      date: "2024-11-05 10:15",
    },
    {
      title: "Gas Delivery",
      description: "Delivered 2 gallons of gasoline.",
      date: "2024-11-04 09:45",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="pt-20 p-4">
        <h1 className="text-4xl font-bold text-center mb-8 pt-10 text-gray-800">
          Service History
        </h1>

        {history.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {history.map((entry, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 border border-gray-200"
              >
                <div className="flex-shrink-0">
                  <FaCheckCircle size={40} className="text-green-500" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                    {entry.title}
                  </h2>
                  <p className="text-gray-600">{entry.description}</p>
                  <div className="flex items-center text-gray-500 mt-3 space-x-2">
                    <FaClock />
                    <span className="text-sm">{entry.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No service history available.
          </p>
        )}
      </main>
    </div>
  );
}
