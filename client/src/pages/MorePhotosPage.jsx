import React from "react";
import Image from "../components/Image";

const MorePhotosPage = ({ placeData, setShowMorePhotos }) => {
  return (
    <div className="absolute inset-0 bg-blue-50 min-h-screen">
      <div className="bg-blue-50 p-8 grid gap-4">
        <div>
          <h2 className="text-3xl mr-36">Photos of {placeData.title}</h2>
          {/* Render the close button */}
          <button
            onClick={() => setShowMorePhotos(false)}
            className="fixed right-10 top-10 flex gap-2 py-2 px-4 rounded-full shadow shadow-black bg-white hover:bg-blue-300 hover:text-white"
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
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Close photos
          </button>
        </div>
        {/* Render the place photos */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {placeData?.photos?.length > 0 &&
            placeData.photos.map((photo, index) => (
              <div
                key={index}
                className="w-full h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden"
              >
                <Image
                  src={photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MorePhotosPage;
