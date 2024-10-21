import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export const AccountPage = () => {
  // Access the user context to get user data, setUser function, and ready state
  const { user, setUser, ready } = useContext(UserContext);

  // Initialize state to control redirection after logout
  const [redirect, setRedirect] = useState(false);

  // Get the subpage parameter from the URL, default to "profile" if undefined
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  // Function to handle user logout
  async function logout() {
    await axios.post("/logout");
    setRedirect(true); // Set redirect to true to trigger navigation
    setUser(null); // Clear user data from the context
  }

  // If the user context is not ready, show a loading state
  if (!ready) {
    return "Loading";
  }

  // If the user is not logged in and not redirecting, navigate to the login page
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  // Function to apply styles to active navigation links
  function linkStyle(type = null) {
    let classes = "inline-flex gap-2 py-2 px-6 rounded-full";
    // Apply background color and rounded style when active
    if (type === subpage) {
      classes += " bg-primary";
    } else {
      classes += " bg-slate-200";
    }
    return classes;
  }

  // If redirect true, navigate to the homepage
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      {/* Navigation links for different subpages */}
      <nav className="w-full flex justify-center mt-8 gap-6">
        <Link className={linkStyle("profile")} to={"/account"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkStyle("bookings")} to={"/account/bookings"}>
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
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          My Booking
        </Link>
        <Link className={linkStyle("listings")} to={"/account/listings"}>
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
              d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
            />
          </svg>
          My Listings
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="max-w-lg text-center mx-auto mt-10">
          Logged in as {user.name} ({user.email})
          <br />
          <button
            onClick={logout}
            className="px-48 py-2 mt-4 mx-auto bg-primary rounded-full"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
