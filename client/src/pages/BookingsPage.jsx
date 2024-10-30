import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import Image from "../components/Image";

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

      {/* Render the list of bookings */}
      <div className="mt-6 mx-4">
        {bookingsData.map((booking) => (
          <Link
            to={`/account/bookings/${booking._id}`}
            key={booking._id}
            className="flex gap-4 bg-red-50 mb-4 p-4 rounded-2xl cursor-pointer"
          >
            {/* Render the place first photo */}
            <div className="w-48">
              {/* Render the Image component */}
              <Image
                src={booking.place.photos[0]}
                alt=""
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
