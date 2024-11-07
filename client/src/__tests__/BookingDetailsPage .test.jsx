import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import BookingDetailsPage from "../pages/BookingDetailsPage";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock the axios.get function
vi.mock("axios");

describe("BookingDetailsPage", () => {
  it("fetches a booking data and all details", async () => {
    // Define the mock place data that the axios call will return
    const mockBookingData = {
      place: {
        title: "A cozy Place",
        description: "Nice stay near the beach",
        amenities: ["wifi", "parking"],
        extraInfo: "Pet not allowed",
        address: "123 Cypress Rd",
        checkIn: 14,
        checkOut: 11,
      },
      checkIn: "2023-08-01",
      checkOut: "2023-08-07",
      name: "Test",
      email: "Test@gmail.com",
      numberOfGuests: 4,
      price: 400,
    };

    // Mock the axios.get response
    axios.get.mockResolvedValueOnce({
      data: [{ _id: "123", ...mockBookingData }],
    });

    // Render the component within a MemoryRouter to simulate routing
    render(
      <MemoryRouter initialEntries={["/account/bookings/123"]}>
        <Routes>
          <Route
            path="/account/bookings/:id"
            element={<BookingDetailsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the title and other elements to appear after the API call
    await waitFor(() => screen.getByText(mockBookingData.place.title));

    // Assertions to check that the data is rendered correctly
    expect(screen.getByText(mockBookingData.place.title)).toBeInTheDocument();
    expect(screen.getByText(mockBookingData.place.address)).toBeInTheDocument();

    // Check for the label
    expect(screen.getByText("Booking information")).toBeInTheDocument();
    expect(screen.getByText("Dates:")).toBeInTheDocument();
    expect(screen.getByText(/Number of guests:/)).toBeInTheDocument();
  });
});
