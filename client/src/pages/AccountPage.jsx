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
    let classes = "py-2 px-6 ";
    // Apply background color and rounded style when active
    if (type === subpage) {
      classes += "bg-primary rounded-full";
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
          My Profile
        </Link>
        <Link className={linkStyle("bookings")} to={"/account/bookings"}>
          My Booking
        </Link>
        <Link className={linkStyle("listings")} to={"/account/listings"}>
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
