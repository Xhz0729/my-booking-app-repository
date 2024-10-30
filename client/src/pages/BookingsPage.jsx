import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingsPage = () => {
  // State for bookingsData
  const [bookingsData, setBookingsData] = useState([]);

  // Fetch bookings using axios
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookingsData(response.data);
    });
  }, []);

  return <div>Bookings</div>;
};

export default BookingsPage;
