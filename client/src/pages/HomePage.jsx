import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "../components/Image";
import { Link } from "react-router-dom";

const HomePage = () => {
  // State for my places
  const [placesData, setPlacesData] = useState([]);
  // Fetch all the places from the database
  useEffect(() => {
    axios.get("/all-places").then((res) => setPlacesData(res.data));
  }, []);
  return (
    <div className="ml-8 mt-8 gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* Render the list of places */}
      {placesData.length > 0 &&
        placesData.map((place) => (
          <Link to={"/place/" + place._id} key={place._id}>
            {/* Render the place first image */}
            <div className="rounded-xl flex">
              {place.photos?.[0] && (
                <Image
                  className="rounded-xl object-cover aspect-square"
                  src={place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            {/* Render the place title */}
            <h2 className="truncate mt-2">{place.title}</h2>
            {/* Render the place address */}
            <h3 className="font-bold">{place.address}</h3>
            {/* Render the place price */}
            <p className="mt-1">
              $<span className="font-bold">{place.price}</span> per night
            </p>
          </Link>
        ))}
    </div>
  );
};

export default HomePage;
