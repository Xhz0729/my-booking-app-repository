import React from "react";
import Image from "./Image";

const Photos = ({ placeData, setShowMorePhotos }) => {
  return (
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
  );
};

export default Photos;
