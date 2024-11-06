import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
  // grab user from Usercontext
  const { user } = useContext(UserContext);
  return (
    <div>
      <header className="p-6 flex justify-between">
        {/* icon and company name */}
        {/* click the icon to direct to hompage */}
        <Link to={"/"} href="" className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#93C5FD"
            className="size-10"
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
              clipRule="evenodd"
            />
          </svg>

          <span className="font-bold text-xl text-blue-300">DreamStay</span>
        </Link>
        {/* search area */}
        <div className="flex justify-center border border-neutral-300 rounded-full py-2 px-8 shadow-md shadow-gray-300 gap-5">
          <div className="mt-4">Where</div>
          <div className="border-l border-neutral-300"></div>
          <div className="mt-4">When</div>
          <div className="border-l border-neutral-300"></div>
          <div className="mt-4">Guests</div>
          <button className="bg-primary text-gray-700 text-xs px-4 py-2 rounded-full hover:bg-blue-300 hover:text-white">
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            Search
          </button>
        </div>
        {/* menu bar and user icon */}
        <Link
          // if we have a user, go to account page, otherwise go to login page
          to={user ? "/account" : "/login"}
          className="flex items-center border border-neutral-300 rounded-full py-2 px-6 shadow-md shadow-gray-300 gap-4"
        >
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="bg-slate-500 text-white rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/* Conditionally render the user's name if the user object exists */}
          {!!user && <div>{user.name}</div>}
        </Link>
      </header>
    </div>
  );
};

export default Header;
