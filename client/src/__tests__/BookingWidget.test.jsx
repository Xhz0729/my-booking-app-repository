import { render, fireEvent, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import { UserContext } from "../context/UserContext";
import axios from "axios";

vi.mock("axios");

describe("BookingWidget render not crashing", () => {
  // Provide mock data for placeData prop
  const placeData = {
    _id: "1",
    price: 100,
    maxGuests: 4,
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

  it("submits the form to create a new booking", () => {
    // Mock the axios.post response to simulate a successful booking response
    axios.post.mockResolvedValueOnce({ data: { _id: "mockBookingId" } });

    renderComponent();

    // Provide mock data for check-in and check-out dates
    const checkIn = "2024-10-01";
    const checkOut = "2024-10-05";
    fireEvent.change(screen.getByLabelText(/Check-in:/), {
      target: { value: checkIn },
    });
    fireEvent.change(screen.getByLabelText(/Check-out:/), {
      target: { value: checkOut },
    });

    fireEvent.change(screen.getByLabelText(/Number of guests:/), {
      target: { value: "2" }, // The value should be a string here, not a number
    });

    // Mock the name and email input
    fireEvent.change(screen.getByLabelText(/Your name:/), {
      target: { value: "Test" },
    });

    fireEvent.change(screen.getByLabelText(/Your email:/), {
      target: { value: "test@example.com" },
    });

    // Trigger form submission by clicking the button
    fireEvent.click(screen.getByRole("button", { name: /Book this place/ }));
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  // Test the number of guests input validation
  it("limits the number of guests input between 1 and the maxGuests", () => {
    renderComponent();
    // Initially, the value should be 1 as the state is set to 1
    const input = screen.getByLabelText(/Number of guests:/);
    expect(input.value).toBe("1");

    // Mock the input onChange event, input greater than maxGuests
    fireEvent.change(input, { target: { value: "6" } });
    // Assert that the value is set to the maxGuests
    expect(input.value).toBe("4");

    // Mock the input onChange event, input less than 1
    fireEvent.change(input, { target: { value: "0" } });
    // Assert that the value is set to 1
    expect(input.value).toBe("1");

    // Mock the input onChange event, input between 1 and maxGuests
    fireEvent.change(input, { target: { value: "2" } });
    // Assert that the value is set to 3
    expect(input.value).toBe("2");
  });
});
