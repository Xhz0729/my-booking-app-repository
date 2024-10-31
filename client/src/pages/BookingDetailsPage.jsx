import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapLink from "../components/MapLink";

const BookingDetailsPage = () => {
  // Get the booking ID from the URL
  const { id } = useParams();

  //State of booking
  const [booking, setBooking] = useState(null);

  // Use axios to get the booking details
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      // Find the booking that matches the ID
      const matchedBooking = response.data.find(({ _id }) => _id === id);
      setBooking(matchedBooking);
    });
  }, [id]);

  // If the booking is not found, return an empty string
  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      {/* Render the booking place title */}
      <h1 className="text-xl font-bold mb-2">{booking.place.title}</h1>

      {/* Render the booking address */}
      <MapLink address={booking.place.address} />
    </div>
  );
};

export default BookingDetailsPage;
