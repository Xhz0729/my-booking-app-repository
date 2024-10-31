import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import Image from "../components/Image";
import { format } from "date-fns";

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
            <div className="grow-0 shrink">
              {/* Render the booking place title */}
              <h2 className="text-xl font-bold">{booking.place.title}</h2>
              {/* Render the booking check-in and check-out dates */}
              {format(new Date(booking.checkIn), "MMM dd, yyyy")} -{" "}
              {format(new Date(booking.checkOut), "MMM dd, yyyy")}
              {/* Render the booking place price */}
              <p className="mt-1">Total price: ${booking.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
