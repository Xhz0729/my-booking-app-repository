import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import Image from "../components/Image";

const PlacesPage = () => {
  // Place state
  const [places, setPlaces] = useState([]);
  // Fetch places using axios
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div>
      {/*Render the AccountNav component*/}
      <AccountNav />
      {/* Render link to add a new place */}
      <div className="text-center mt-10">
        <Link
          to="/account/listings/new"
          className="bg-primary inline-flex py-2 px-6 gap-1 rounded-full hover:bg-blue-300 hover:text-white"
          role="button" // Added for accessibility
          tabIndex="0" // Added for keyboard navigation
        >
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
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add a new place
        </Link>
      </div>
      {/* Render the list of places */}
      <div className="mt-6">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/listings/" + place._id}
              className="flex gap-4 bg-blue-200 mb-4 p-4 rounded-2xl cursor-pointer"
              key={place._id}
            >
              {/* Render the place first image */}
              <div className="w-32 h-32 bg-blue-200 grow shrink-0">
                {/* Render the Image component */}
                <Image
                  src={`${place.photos[0]}`}
                  alt={place.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-bold ">{place.title}</h2>
                <p className="text-sm mt-2 text-gray-700">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
