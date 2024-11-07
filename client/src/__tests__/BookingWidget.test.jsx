import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import { UserContext } from "../context/UserContext";
import { expect } from "vitest";

describe("BookingWidget render not crashing", () => {
  // Provide mock data for placeData prop
  const placeData = {
    _id: "1",
    price: 100,
  };

  // Provide mock data for the user context
  const mockUser = {
    name: "Test",
    email: "test@example.com",
  };
  // Render the BookingWidget component with the UserContext and MemoryRouter
  const renderComponent = () =>
    render(
      <UserContext.Provider value={{ user: mockUser }}>
        <MemoryRouter>
          <BookingWidget placeData={placeData} />
        </MemoryRouter>
      </UserContext.Provider>
    );

  // Test the BookingWidget component renders with right price calculation
  it("Calculate the total price", () => {
    renderComponent();
    // Provide mock data for the check-in and check-out dates
    const checkIn = "2024-10-01";
    const checkOut = "2024-10-05";
    // Mock the input onChange event
    fireEvent.change(screen.getByLabelText(/Check-in:/), {
      target: { value: checkIn },
    });

    fireEvent.change(screen.getByLabelText(/Check-out:/), {
      target: { value: checkOut },
    });
    const totalDays = 4;
    const totalPrice = totalDays * placeData.price;
    // Assert that the total days are calculated correctly
    expect(screen.getByText(`with $${totalPrice}`)).toBeInTheDocument();
  });
});
