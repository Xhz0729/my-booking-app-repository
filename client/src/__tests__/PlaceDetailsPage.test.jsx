import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import PlaceDetailsPage from "../pages/PlaceDetailsPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { expect } from "vitest";

// Mock the axios.get function
vi.mock("axios");

describe("PlaceDetailsPage", () => {
  it("fetches place data and renders place details", async () => {
    // Define the mock place data that the axios call will return
    const mockPlaceData = {
      title: "A cozy Place",
      description: "Nice stay near the beach",
      maxGuests: 4,
      amenities: ["wifi", "parking"],
      extraInfo: "Pet not allowed",
      checkIn: 14,
      checkOut: 11,
      maxGuests: 4,
    };

    // Mock the axios.get response
    axios.get.mockResolvedValueOnce({ data: mockPlaceData });

    // Render the component within a MemoryRouter to simulate routing with a `placeId`
    render(
      <MemoryRouter initialEntries={["/place/123"]}>
        <Routes>
          <Route path="/place/:id" element={<PlaceDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the title and other elements to appear after the API call
    await waitFor(() => screen.getByText(mockPlaceData.title));

    // Assertions to check that the data is rendered correctly
    expect(screen.getByText(mockPlaceData.title)).toBeInTheDocument();
    expect(screen.getByText(mockPlaceData.description)).toBeInTheDocument();
    expect(screen.getByText(mockPlaceData.extraInfo)).toBeInTheDocument();
    expect(screen.getByText("WIFI")).toBeInTheDocument();
    expect(screen.getByText("Free Parking")).toBeInTheDocument();
    expect(screen.getByText(mockPlaceData.extraInfo)).toBeInTheDocument();
    expect(
      screen.getByText(`Check-in:${mockPlaceData.checkIn}:00 pm`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Check-out:${mockPlaceData.checkOut}:00 am`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Max guests:${mockPlaceData.maxGuests} guests`)
    ).toBeInTheDocument();
  });
});
