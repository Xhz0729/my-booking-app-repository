import { render, screen, waitFor } from "@testing-library/react";
import AddPlaceForm from "../components/AddPlaceForm";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

vi.mock("axios");
describe("AddPlaceForm", () => {
  // Test the form renders with initial values
  it("renders form with initial values", async () => {
    const mockPlaceData = {
      title: "A cozy Place",
      address: "Crane Hills, Alabama",
      photos: [
        "https://dream-stay-booking-app.s3.amazonaws.com/1730693424736.jpg",
        "https://dream-stay-booking-app.s3.amazonaws.com/1730693303531.jpg",
      ],
      description: "Nice stay near the beach",
      amenities: ["wifi", "parking"],
      extraInfo: "Pet not allowed",
      checkIn: 14,
      checkOut: 11,
      maxGuests: 4,
      price: 123,
    };

    // Mock the axios.get response
    axios.get.mockResolvedValueOnce({ data: mockPlaceData });

    render(
      <MemoryRouter initialEntries={["/account/listings/123"]}>
        <Routes>
          <Route path="/account/listings/:id" element={<AddPlaceForm />} />
        </Routes>
      </MemoryRouter>
    );
    // Wait for the component to render with the mocked data
    await waitFor(() => {
      // Check that the input has the correct value
      expect(screen.getByDisplayValue(mockPlaceData.title)).toBeInTheDocument();
    });

    // Check that the input has the correct value
    expect(screen.getByDisplayValue(mockPlaceData.address)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockPlaceData.description)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockPlaceData.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockPlaceData.checkIn)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockPlaceData.checkOut)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockPlaceData.maxGuests)
    ).toBeInTheDocument();
  });

  // Test the form renders with the correct section titles
  it("renders form each section title correctly", () => {
    // Render the form
    render(
      <MemoryRouter>
        <AddPlaceForm />
      </MemoryRouter>
    );
    // Check that the form section titles are rendered
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Photos")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Amenities")).toBeInTheDocument();
    expect(screen.getByText("Extra info")).toBeInTheDocument();
    expect(screen.getByText("Time for check in&out")).toBeInTheDocument();
  });

  // Test the form renders with empty input fields when no data is passed
  it("renders form with empty input fields", () => {
    // Render the form
    render(
      <MemoryRouter>
        <AddPlaceForm />
      </MemoryRouter>
    );

    // Check that all text input fields are empty
    const textInputs = screen.getAllByRole("textbox");
    textInputs.forEach((input) => expect(input).toHaveValue(""));

    // Check that all checkbox input fields are unchecked
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
  });
});
