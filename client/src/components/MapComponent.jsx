import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"; // Ensure you have these installed

const MapComponent = ({ placeData }) => {
  // State for the coordinates
  const [coordinates, setCoordinates] = useState(null);
  // Fetch the coordinates from the address
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!placeData?.address) return; // Prevent fetching if the address is not available
      try {
        const response = await axios.get(
          `/geocode?address=${encodeURIComponent(placeData.address)}`
        );
        setCoordinates(response.data); 
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates(); // Call the function
  }, [placeData]);

  // If the coordinates are not available, show a loading message
  if (!coordinates) return <p>Loading map...</p>;

  return (
    <div>
      {/* Render the place address */}
      <a
        className="flex gap-1 underline text-blue-300 my-3"
        target="_blank"
        rel="noopener noreferrer" // Open the link in a new tab
        href={
          "https://maps.google.com/?q=" + encodeURIComponent(placeData.address)
        }
      >
        {/* Render the address icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        {/* Render the address google map link */}
        {placeData.address}
      </a>

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          center={coordinates}
          zoom={10}
          mapContainerStyle={{ height: "400px", width: "100%" }}
        >
          {/* Add a marker here */}
          <Marker
            position={coordinates} // Set marker position to coordinates
            title={placeData.address} // Optional: set title for the marker
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
