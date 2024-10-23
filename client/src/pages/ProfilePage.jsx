import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  // Access the user context to get user data, setUser function, and ready state
  const { user, setUser, ready } = useContext(UserContext);

  // Initialize state to control redirection after logout
  const [redirect, setRedirect] = useState(false);

  // Get the subpage from the URL path
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

  // If redirect true, navigate to the homepage
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      {/* Navigation links for different subpages */}
      <AccountNav />
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

      {subpage === "listings" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
