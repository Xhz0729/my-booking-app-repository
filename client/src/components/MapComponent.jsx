import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import MapLink from "./MapLink";

const MapComponent = ({ placeData }) => {
  const [coordinates, setCoordinates] = useState(null);
  const mapRef = useRef(null); // Reference to the map
  const markerRef = useRef(null); // Reference to the marker

  // Load the Google Maps JavaScript API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Fetch the coordinates from the address
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!placeData?.address) return;
      try {
        const response = await axios.get(
          `/geocode?address=${encodeURIComponent(placeData.address)}`
        );
        setCoordinates(response.data);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [placeData]);

  // Set up the marker once the map and coordinates are loaded
  useEffect(() => {
    if (isLoaded && coordinates && mapRef.current) {
      // Use google.maps.Marker
      markerRef.current = new window.google.maps.Marker({
        map: mapRef.current,
        position: coordinates,
        title: placeData.address,
      });
    }

    // Clean up the marker on component unmount
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [isLoaded, coordinates]);

  if (!isLoaded) return <p>Loading Google Maps...</p>;
  if (!coordinates) return <p>Loading map...</p>;

  return (
    <div>
      {/* Render the MapLink component */}
      <MapLink address={placeData.address} />

      <GoogleMap
        center={coordinates}
        zoom={10}
        mapContainerStyle={{ height: "400px", width: "100%" }}
        onLoad={(map) => (mapRef.current = map)}
      />
    </div>
  );
};

export default MapComponent;
