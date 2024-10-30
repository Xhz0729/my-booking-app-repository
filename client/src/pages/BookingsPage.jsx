import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";

const BookingsPage = () => {
  // State for bookingsData
  const [bookingsData, setBookingsData] = useState([]);

  // Fetch bookings using axios
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookingsData(response.data);
    });
  }, []);

  return (
    <div>
      {/* Render the AccountNav component */}
      <AccountNav />
    </div>
  );
};

export default BookingsPage;
