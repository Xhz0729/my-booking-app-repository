import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";
import HomePage from "../pages/HomePage";

// Mock Axios to control its response in the test
vi.mock("axios");

describe("HomePage component", () => {
  const mockPlacesData = [
    {
      owner: "degdebnqnk129",
      title: "Cozy Apartment",
      address: "123 Cedar Street",
      photos: [
        "https://a0.muscache.com/im/pictures/8efb200c-6dcb-460d-a367-caa511506077.jpg?im_w=720",
      ],
      description: "A cozy apartment in the heart of the city.",
      amenities: ["wifi", "pool"],
      extraInfo: "architect-designed summerhouse for the discerning. ",
      checkIn: 14,
      checkOut: 11,
      maxGuests: 4,
      price: 200,
    },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    axios.get.mockResolvedValue({ data: mockPlacesData });
  });

  it("fetches and displays places data", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Ensure the Axios GET request was called once
    expect(axios.get).toHaveBeenCalledWith("/all-places");

    // Wait for the places to be displayed
    await waitFor(() => {
      expect(screen.getByText("Cozy Apartment")).toBeInTheDocument();
    });

    // Check for other details for each place
    expect(screen.getByText("123 Cedar Street")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });
});
