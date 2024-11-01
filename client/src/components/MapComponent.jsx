import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, Marker } from "@react-google-maps/api"; // Ensure you have these installed
import MapLink from "./MapLink";

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
      {/* Render the MapLink component*/}
      <MapLink address={placeData.address} />

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
    </div>
  );
};

export default MapComponent;
