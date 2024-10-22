import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Amenities from "../components/Amenities";
import axios from "axios";

// State management for form fields, photos, and amenities
const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  // upload image by url function
  async function addPhotoByUrl(ev) {
    ev.preventDefault(); // Prevent form from submitting
    try {
      // Make POST request to upload the photo by URL
      const { data: filename } = await axios.post("/upload-by-url", {
        link: photoLink,
      });
      // Update the photos state by adding the new filename to the existing list
      setPhotos((prevPhotos) => {
        return [...prevPhotos, filename.trim()]; // move possible spaces
      });
      // Clear the input field after successful upload
      setPhotoLink("");
    } catch (error) {
      // error handling
      console.error("Failed to upload the photo:", error);
    }
  }

  // Function to upload photos via local device
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    // Append each file to the FormData
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    // Send the files to the server
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        // Spread the previous photos and the new filenames into the photos state
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...filenames];
        });
      });
  }

  return (
    <div>
      {/* Render link to add a new place if action is not "new" */}
      {action !== "new" && (
        <div className="text-center mt-10">
          <Link
            to="/account/listings/new"
            className="bg-primary inline-flex py-2 px-6 gap-1 rounded-full"
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
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Add a new place
          </Link>
        </div>
      )}
      {/* Render the form if action is "new" */}
      {action === "new" && (
        <div>
          <form>
            {/* Title input */}
            <h2 className="text-xl mt-6 mb-2">Title</h2>
            <p className="text-stone-500">
              Create a title for your staying—keep it short and catchy.
            </p>
            <input
              type="text"
              placeholder="My lovely statying"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />

            {/* Address input */}
            <h2 className="text-xl mt-6 mb-2">Address</h2>
            <p className="text-stone-500">Provide location of this staying</p>
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />

            {/* Photo input */}
            <h2 className="text-xl mt-6 mb-2">Photos</h2>
            <p className="text-stone-500">
              Provide photos to give more details about this staying
            </p>

            {/* Photo input via URL */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add photos using a link"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />
              <button
                className="bg-primary rounded-full text-sm"
                onClick={addPhotoByUrl}
              >
                Add photo
              </button>
            </div>
            {/* Render uploaded photos */}
            <div className="grid grid-cols-3 md: grid-cols-4 lg:grid-cols-6 gap-2">
              {photos.length > 0 &&
                photos.map((link, index) => {
                  const imageUrl =
                    "http://localhost:8080/uploads/" + String(link).trim();
                  console.log(imageUrl);
                  return (
                    <div key={link || index}>
                      <img src={imageUrl} alt="image of the staying" />
                    </div>
                  );
                })}

              {/* Uploaded photos from local devices */}
              <label className="cursor-pointer flex items-center gap-1 border bg-transparent rounded-2xl p-6 text-2xl text-stone-600">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                {/* SVG of Upload icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Upload
              </label>
            </div>

            {/* Description input */}
            <h2 className="text-xl mt-6 mb-2">Description</h2>
            <p className="text-stone-500">
              Write a nice description for this staying
            </p>
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />

            {/* Render Amenities */}
            <h2 className="text-xl mt-6 mb-2">Amenities</h2>
            <p className="text-stone-500">
              Select all amenities that apply to this staying.
            </p>
            {/*checkboxes */}
            <div>
              <Amenities selected={amenities} onChange={setAmenities} />
            </div>

            {/* Extra info input*/}
            <h2 className="text-xl mt-6 mb-2">Extra info</h2>
            <p className="text-stone-500">Rules for this staying, etc</p>
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />

            {/* Check in&out input and guests number input*/}
            <h2 className="text-xl mt-6 mb-2">Time for check in&out</h2>
            <p className="text-stone-500">Set check in&out time</p>
            <div className="grid grid-cols-3 gap-2">
              {/*Check in input */}
              <div>
                <h3>Check in time</h3>
                <input
                  type="text"
                  placeholder="15:00PM"
                  value={checkIn}
                  onChange={(ev) => onChange(setCheckIn(ev.target.value))}
                />
              </div>

              {/*Check out input */}
              <div>
                <h3>Check out time</h3>
                <input
                  type="text"
                  placeholder="11:00AM"
                  value={checkOut}
                  onChange={(ev) => onChange(setCheckOut(ev.target.value))}
                />
              </div>

              {/*Guests number input */}
              <div>
                <h3>Max number of guests</h3>
                <input
                  type="number"
                  placeholder="4"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
                <input />
              </div>
            </div>
            {/*Save button */}
            <div>
              <button className="login my-2">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
