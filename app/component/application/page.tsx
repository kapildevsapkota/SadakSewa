"use client";
import Image from "next/image";
import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import Header from "../header";
import Cookies from "js-cookie";

// Define types for coordinates and errors
interface Coordinates {
  lat: number;
  lng: number;
}

interface Errors {
  vehicleType?: string;
  description?: string;
  contactInfo?: string;
  location?: string;
  problemType?: string;
}

// Function to fetch place name from OpenStreetMap API
const fetchPlaceName = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("Error fetching place name:", error);
    return null;
  }
};

const ApplicationForm = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [location, setLocation] = useState("");
  const [problemType, setProblemType] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const emailCookie = Cookies.get("email");
    if (!emailCookie) {
      alert("Please Log In First");
      router.push("/component/login");
    }
  }, [router]);

  // Set problem type from query parameter if provided
  useEffect(() => {
    const preselectedProblemType = searchParams.get("service");
    if (preselectedProblemType) {
      setProblemType(preselectedProblemType);
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!vehicleType) newErrors.vehicleType = "Vehicle Type is required.";
    if (!description)
      newErrors.description = "Complaint Description is required.";
    if (!contactInfo)
      newErrors.contactInfo = "Contact Information is required.";
    if (!location) newErrors.location = "Location of Incident is required.";
    if (!problemType)
      newErrors.problemType = "Type of Problem Faced is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const complaintData = {
        vehicleType,
        description,
        contactInfo,
        location,
        problemType,
        additionalNotes,
        coordinates,
      };

      try {
        const response = await axios.post(
          "/api/submitComplaint",
          complaintData
        );
        if (response.status === 201) {
          setShowNotification(true); // Show notification on success

          // Reset form fields after successful submission
          setVehicleType("");
          setDescription("");
          setContactInfo("");
          setLocation("");
          setProblemType("");
          setAdditionalNotes("");
          setCoordinates(null);
          setErrors({});

          // Delay redirect to show notification for 3 seconds
          setTimeout(() => {
            setShowNotification(false);
            router.push("/component/LoggedIn");
          }, 3000); // 3 seconds delay
        } else {
          console.error("Error submitting complaint.");
        }
      } catch (error) {
        console.error("Error submitting complaint:", error);
      }
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          fetchPlaceName(latitude, longitude).then((placeName) => {
            setLocation(placeName || `Lat: ${latitude}, Lng: ${longitude}`);
            setIsLoading(false);
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get current location.");
          setIsLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-24">
        <h2 className="text-lg font-bold mb-4">Vehicle Complaint Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="vehicleType">
              Vehicle Type
            </label>
            <select
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
                setErrors((prev) => ({ ...prev, vehicleType: undefined }));
              }}
              required
              className={`border rounded-md w-full p-2 ${
                errors.vehicleType ? "border-red-500" : ""
              }`}
            >
              <option value="">Select a vehicle type...</option>
              <option value="Car">Car</option>
              <option value="Bus">Bus</option>
              <option value="Bike">Bike</option>
              <option value="Truck">Truck</option>
              <option value="Other">Other</option>
            </select>
            {errors.vehicleType && (
              <p className="text-red-500">{errors.vehicleType}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="description">
              Complaint Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((prev) => ({ ...prev, description: undefined }));
              }}
              required
              className={`border rounded-md w-full p-2 ${
                errors.description ? "border-red-500" : ""
              }`}
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="contactInfo">
              Contact Information
            </label>
            <input
              type="text"
              id="contactInfo"
              value={contactInfo}
              onChange={(e) => {
                setContactInfo(e.target.value);
                setErrors((prev) => ({ ...prev, contactInfo: undefined }));
              }}
              required
              className={`border rounded-md w-full p-2 ${
                errors.contactInfo ? "border-red-500" : ""
              }`}
            />
            {errors.contactInfo && (
              <p className="text-red-500">{errors.contactInfo}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="location">
              Location of Incident
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setErrors((prev) => ({ ...prev, location: undefined }));
                }}
                required
                className={`border rounded-md w-full p-2 ${
                  errors.location ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                className="ml-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                {isLoading ? "Loading..." : "Use Current Location"}
              </button>
            </div>
            {errors.location && (
              <p className="text-red-500">{errors.location}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="problemType">
              Type of Problem Faced
            </label>
            <select
              id="problemType"
              value={problemType}
              onChange={(e) => {
                setProblemType(e.target.value);
                setErrors((prev) => ({ ...prev, problemType: undefined }));
              }}
              required
              className={`border rounded-md w-full p-2 ${
                errors.problemType ? "border-red-500" : ""
              }`}
            >
              <option value="">Select a problem type...</option>
              <option value="Flat Tire">Flat Tire</option>
              <option value="Engine Trouble">Engine Trouble</option>
              <option value="Fuel Shortage">Fuel Shortage</option>
              <option value="Other">Other</option>
            </select>
            {errors.problemType && (
              <p className="text-red-500">{errors.problemType}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="additionalNotes">
              Additional Notes (Optional)
            </label>
            <textarea
              id="additionalNotes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="border rounded-md w-full p-2"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
          >
            Submit Complaint
          </button>
        </form>
        {showNotification && (
          <div className="fixed top-4 right-4 p-4 bg-green-200 text-green-700 rounded-md shadow-lg mt-10">
            Application submitted! You will receive a response shortly. Please
            wait a moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
