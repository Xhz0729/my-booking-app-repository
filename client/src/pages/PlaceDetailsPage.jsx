import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Image from "../components/Image";
import BookingWidget from "../components/BookingWidget";
import MorePhotosPage from "./MorePhotosPage";
import MapComponent from "../components/MapComponent";

const PlaceDetailsPage = () => {
  // Get the place id from the URL
  const { id } = useParams();
  // State for the place data
  const [placeData, setPlaceData] = useState({});
  // State for showing more photos
  const [showMorePhotos, setShowMorePhotos] = useState(false);

  // fecth the place details from the database
  useEffect(() => {
    if (!id) return;
    axios.get(`/place/${id}`).then((res) => setPlaceData(res.data));
  }, [id]);

  // Check if show more photos is true
  // If true, render all the photos
  if (showMorePhotos) {
    return (
      <MorePhotosPage
        placeData={placeData}
        setShowMorePhotos={setShowMorePhotos}
      />
    );
  }

  return (
    <div className="mt-4 bg-blue-50 -mx-8 px-20 pt-8">
      {/* Render the place title */}
      <h1 className="text-2xl font-bold mb-2">{placeData.title}</h1>

      {/* Render the place photos */}
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
          {/* Render the first photo*/}
          <div>
            {placeData.photos?.[0] && (
              <div className="w-full h-[250px] sm:h-[400px] md:h-[600px] overflow-hidden">
                <Image
                  onClick={() => setShowMorePhotos(true)}
                  className="cursor-pointer object-cover w-full h-full"
                  src={placeData.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          {/* Render the next two photos */}
          <div className="w-full h-[250px] sm:h-[400px] md:h-[600px] overflow-hidden">
            {[1, 2].map(
              (index) =>
                placeData.photos?.[index] && (
                  <div
                    key={index}
                    className="w-full h-[125px] sm:h-[200px] md:h-[300px] overflow-hidden"
                  >
                    <Image
                      onClick={() => setShowMorePhotos(true)}
                      className={`cursor-pointer object-cover w-full h-full ${
                        index === 2 ? "relative top-2" : ""
                      }`}
                      src={placeData.photos[index]}
                      alt=""
                    />
                  </div>
                )
            )}
          </div>
          {/* Render the see more photos button */}
          <button
            onClick={(ev) => setShowMorePhotos(true)}
            className="flex absolute gap-2 right-2 bottom-2 p-2 rounded-full shadow shadow-black bg-white hover:bg-blue-300 hover:text-white"
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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            See more photos
          </button>
        </div>
      </div>

      {/* Render the check in&out time  */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-4 gap-4">
        <div>
          {/* Render the place description */}
          <div className="my-6">
            <h2 className="text-xl font-bold">Description</h2>
            <p>{placeData.description}</p>
          </div>
          <p>Check-in:{placeData.checkIn} pm</p>
          <br />
          <p>Check-out:{placeData.checkOut} am</p>
          <br />
          <p>Max guests:{placeData.maxGuests}</p>
        </div>
        <BookingWidget placeData={placeData} />
      </div>
      <div className="my-4 py-2 leading-6 border-t">
        <h2 className="text-xl font-bold ">Extra information</h2>
        <p className="text-gray-500 mt-1 mb-4">{placeData.extraInfo}</p>
      </div>
      {/* Render the map */}
      <MapComponent placeData={placeData} />
    </div>
  );
};

export default PlaceDetailsPage;
