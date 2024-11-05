import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import Image from "../components/Image";
import { format } from "date-fns";
import MapLink from "../components/MapLink";

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
          <div key={booking._id} className="bg-blue-200 mb-4 p-4 rounded-2xl">
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 cursor-pointer"
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
                <h2 className="text-xl font-bold mb-2">{booking.place.title}</h2>
                {/* Render the booking check-in and check-out dates */}
                {format(new Date(booking.checkIn), "MMM dd, yyyy")} -{" "}
                {format(new Date(booking.checkOut), "MMM dd, yyyy")}
                {/* Render the booking place price */}
                <p className="mt-2">Total price: ${booking.price.toFixed(2)}</p>
                {/* Render the booking place check in&out time */}
                <div className="flex gap-20 mt-2">
                  <div className="flex items-center gap-2">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>

                    <p>
                      <b>Check-in:</b>
                      {booking.place.checkIn}:00 PM
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
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
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <p>
                      <b>Checkout:</b>
                      {booking.place.checkOut}:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {/* Render the MapLink component */}
            <MapLink address={booking.place.address} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
