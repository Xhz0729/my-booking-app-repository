import React from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";

// State management for form fields, photos, and amenities
const PlacesPage = () => {
  return (
    <div>
      {/*Render the AccountNav component*/}
      <AccountNav />
      {/* Render link to add a new place */}
      <div className="text-center mt-10">
        <Link
          to="/account/listings/new"
          className="bg-primary inline-flex py-2 px-6 gap-1 rounded-full"
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
    </div>
  );
};

export default PlacesPage;
