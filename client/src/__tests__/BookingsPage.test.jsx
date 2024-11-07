import axios from "axios";
import BookingsPage from "../pages/BookingsPage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
vi.mock("axios");

describe("BookingPage component", () => {
  // Test the component fetches booking data and renders booking details
  it("fetches booking data and renders booking details"),
    async () => {
      const mockBookingData = {
        place: {
          title: "A cozy Place",
          description: "Nice stay near the beach",
          amenities: ["wifi", "parking"],
          extraInfo: "Pet not allowed",
          address: "123 Cypress Rd",
        },
        user: kjhwdgguw1,
        checkIn: 14,
        checkOut: 11,
        name: "Test",
        email: "Test@gmail.com",
        numberOfGuests: 4,
        price: 400,
      };
      // Mock the axios.get response
      axios.get.mockResolvedValueOnce({ data: mockPlaceData });

      // Render the component within a MemoryRouter to simulate routing
      render(
        <MemoryRouter initialEntries={["/account/bookings"]}>
          <Routes>
            <Route path="/account/bookings" element={<BookingsPage />} />
          </Routes>
        </MemoryRouter>
      );

      // Wait for the title and other elements to appear after the API call
      await waitFor(() => screen.getByText(mockBookingData.place.title));

      // Assertions to check that the data is rendered correctly
      expect(screen.getByText(mockBookingData.place.title)).toBeInTheDocument();
      expect(
        screen.getByText(mockBookingData.place.address)
      ).toBeInTheDocument();
      expect(screen.getByText(mockBookingData.price)).toBeInTheDocument();
      expect(screen.getByText(mockBookingData.checkIn)).toBeInTheDocument();
      expect(screen.getByText(mockBookingData.checkOut)).toBeInTheDocument();
    };
});
