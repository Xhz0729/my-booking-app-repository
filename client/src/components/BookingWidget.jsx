import React, { useEffect, useState, useContext } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

// Create a BookingWidget component with a placeData prop
const BookingWidget = ({ placeData }) => {
  // state of input fields
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  // State for booking name and email
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // State for redirecting to the booking page
  const [redirect, setRedirect] = useState("");

  // Calculate the total days
  let totalDays = 0;
  if (checkIn && checkOut) {
    totalDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }
  // Get the user from the context
  const { user } = useContext(UserContext);

  // Set username and email to the user's data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // Function to handle the form submission
  async function handleBooking(e) {
    e.preventDefault();
    // Create a booking object
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      email,
      price: totalDays * placeData.price,
      place: placeData._id,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="my-6">
      <form className="bg-white p-2 rounded-2xl shadow">
        {/* Render the place price */}
        <p className="text-2xl text-center">
          Price: <b className="text-red-400">${placeData.price}</b> per night
        </p>
        {/* Render the check In&Out input */}
        <div className="grid grid-cols-2 my-4 gap-8 mx-4">
          <label className="border rounded-2xl p-2">
            <b>Check-in:</b>
            <input
              type="date"
              className="w-full p-2 my-2"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </label>
          <label className="border rounded-2xl p-2">
            <b>Check-out:</b>
            <input
              type="date"
              className="w-full p-2 my-2"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </label>
        </div>
        {/* Render the name and email input */}
        {totalDays > 0 && (
          <div className="grid grid-cols-2 my-4 gap-8 mx-4">
            <label>
              <b>Your name:</b>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <b>Your email:</b>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
        )}

        {/* Render the number of numberOfGuests input */}
        <label className="mx-4">
          <b>Number of guests:</b>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </label>
        {/* Render the book button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleBooking}
            className="bg-primary px-8 py-4 mt-4 rounded-2xl shadow hover:bg-blue-300 hover:text-white"
          >
            Book this place
            {totalDays > 0 && (
              <span className="text-sm">
                {" "}
                with ${totalDays * placeData.price}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingWidget;
