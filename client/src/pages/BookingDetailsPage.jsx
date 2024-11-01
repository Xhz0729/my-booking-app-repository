import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapLink from "../components/MapLink";
import Photos from "../components/Photos";
import MorePhotosPage from "./MorePhotosPage";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns";

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

  const [showMorePhotos, setShowMorePhotos] = useState(false); // State for showing more photos

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

      {/* Render the booking info */}
      <div className="bg-primary p-6 my-4 rounded-2xl">
        <h2 className="text-lg font-bold">Booking information</h2>
        {/* Render the booking check-in and check-out dates */}
        <p className="mt-2 flex gap-2">
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
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            />
          </svg>
          <b>Dates:</b>
          {format(new Date(booking.checkIn), "MMM dd, yyyy")} -{" "}
          {format(new Date(booking.checkOut), "MMM dd, yyyy")}
        </p>
        {/* Render the booking price and nights */}
        <p className="mt-2 flex gap-2">
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
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <b>Price:</b> ${booking.price.toFixed(2)} for{" "}
          {differenceInCalendarDays(
            new Date(booking.checkOut),
            new Date(booking.checkIn)
          )}{" "}
          nights
        </p>
        {/* Render the booking place check in&out clock time */}
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
        {/* Render the booking name and number of guests */}
        <p className="mt-2 flex gap-2">
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
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
          <b>Booked by:</b> {booking.name}
          <b className="ml-4">Number of guests:</b> {booking.numberOfGuests}
        </p>
      </div>
      {/* Conditionally render MorePhotosPage or Photos */}
      {showMorePhotos ? (
        <MorePhotosPage
          placeData={booking.place}
          setShowMorePhotos={setShowMorePhotos}
        />
      ) : (
        <Photos
          placeData={booking.place}
          setShowMorePhotos={setShowMorePhotos}
        />
      )}
    </div>
  );
};

export default BookingDetailsPage;
