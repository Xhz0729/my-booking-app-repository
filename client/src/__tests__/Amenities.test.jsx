import { render, screen, fireEvent } from "@testing-library/react";
import Amenities from "../components/Amenities";

describe("Amenities component", () => {
  // Test all amenities choices are rendered
  it("renders all amenities choices correctly", () => {
    // Render the Amenities component
    render(<Amenities selected={[]} onChange={() => {}} />);
    // Assert that the amenities are rendered
    expect(screen.getByLabelText("Wifi")).toBeInTheDocument();
    expect(screen.getByLabelText("Free Parking")).toBeInTheDocument();
    expect(screen.getByLabelText("Pets Allowed")).toBeInTheDocument();
    expect(screen.getByLabelText("TV")).toBeInTheDocument();
    expect(screen.getByLabelText("Private Entrance")).toBeInTheDocument();
    expect(screen.getByLabelText("Swimming Pool")).toBeInTheDocument();
  });

  // Test on selection of an amenity
  it("selects an amenity correctly", () => {
    // Mock the onChange function
    const onChange = vi.fn();

    // Render the Amenities component
    render(<Amenities selected={[]} onChange={onChange} />);
    const wifiCheckbox = screen.getByLabelText("Wifi");

    // Simulate a checkbox click to select it
    fireEvent.click(wifiCheckbox);

    // Expect the onChange function to have been called with the updated selected array
    expect(onChange).toHaveBeenCalledWith(["wifi"]);
  });

  it("unselects an amenity correctly", () => {
    // Mock the onChange function
    const onChange = vi.fn();

    // Render the Amenities component with "wifi" selected
    render(<Amenities selected={["wifi"]} onChange={onChange} />);
    const wifiCheckbox = screen.getByLabelText("Wifi");

    // Simulate a checkbox click to uncheck it
    fireEvent.click(wifiCheckbox);

    // Expect the onChange function to have been called with the updated selected array without "wifi"
    expect(onChange).toHaveBeenCalledWith([]);
  });
});
