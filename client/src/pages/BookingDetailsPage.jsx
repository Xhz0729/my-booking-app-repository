import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      if (!matchedBooking) {
        return;
      }
      setBooking(matchedBooking);
    });
  }, [id]);

  return <div>BookingDetailsPage</div>;
};

export default BookingDetailsPage;
