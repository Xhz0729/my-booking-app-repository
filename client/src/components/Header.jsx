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
        <Link to={"/"} href="" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
          <span className="font-bold text-xl">DreamStay</span>
        </Link>
        {/* search area */}
        <div className="flex justify-center border border-neutral-300 rounded-full py-2 px-6 shadow-md shadow-gray-300 gap-4">
          <div className="mt-4">Where</div>
          <div className="border-l border-neutral-300"></div>
          <div className="mt-4">When</div>
          <div className="border-l border-neutral-300"></div>
          <div className="mt-4">Guests</div>
          <button className="bg-primary text-black text-sm p-2 rounded-full hover:bg-blue-300 hover:text-white">
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
