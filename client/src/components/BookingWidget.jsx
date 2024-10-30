import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";

// Create a BookingWidget component with a placeData prop
const BookingWidget = ({ placeData }) => {
  // state of input fields
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // Calculate the total days
  let totalDays = 0;
  if (checkIn && checkOut) {
    totalDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
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
        {/* Render the number of guests input */}
        <label className="">
          <b>Number of guests:</b>
          <input
            type="number"
            className=""
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </label>
        {/* Render the book button */}
        <div className="flex justify-center">
          <button className="bg-primary px-8 py-4 mt-4 rounded-2xl shadow hover:bg-red-400">
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
