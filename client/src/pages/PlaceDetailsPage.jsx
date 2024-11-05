import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import MorePhotosPage from "./MorePhotosPage";
import MapComponent from "../components/MapComponent";
import Photos from "../components/Photos";

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

  return (
    <div className="mt-4 bg-blue-50 -mx-8 px-20 pt-8">
      {/* Render the place title */}
      <h1 className="text-2xl font-bold mb-2">{placeData.title}</h1>

      {/* Conditionally render components based on showMorePhotos */}
      {showMorePhotos ? (
        <MorePhotosPage
          placeData={placeData}
          setShowMorePhotos={setShowMorePhotos}
        />
      ) : (
        <>
          <Photos placeData={placeData} setShowMorePhotos={setShowMorePhotos} />
          <MapComponent placeData={placeData} />
        </>
      )}

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
          {/* Render the place amenities */}
          <div className="my-6">
            <h2 className="text-xl font-bold">Amenities</h2>
            <ul className="list-disc list-inside">
              {placeData.amenities &&
                placeData.amenities.map((amenity) => {
                  {
                    /* Implement the amenityLabels object */
                  }
                  const amenityLabels = {
                    parking: "Free Parking",
                    tv: "TV",
                    wifi: "WIFI",
                    pet: "Pet Friendly",
                    entrance: "Private Entrance",
                    pool: "Swimming Pool",
                  };
                  {
                    /* Render amenityLabels's value accordingly */
                  }
                  return amenityLabels[amenity] ? (
                    <li key={amenity}>{amenityLabels[amenity]}</li>
                  ) : null;
                })}
            </ul>
          </div>
        </div>
        <BookingWidget placeData={placeData} />
      </div>
      <div className="my-4 py-2 leading-6 border-t">
        <h2 className="text-xl font-bold ">Extra information</h2>
        <p className="text-gray-500 mt-1 mb-4">{placeData.extraInfo}</p>
      </div>
    </div>
  );
};

export default PlaceDetailsPage;
