import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BookingDetailsPage = () => {
  // Get the booking ID from the URL
  const { id } = useParams();

  //State of booking
  const [booking, setBooking] = useState(null);

  return <div>BookingDetailsPage</div>;
};

export default BookingDetailsPage;
