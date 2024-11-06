import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Header from "../components/Header";

describe("Header component", () => {
  // Test that clicking on the company name navigates to the homepage (‘/‘)
  it("navigates to '/' when clicking the company name", () => {
    // Render the Header component wrapped with UserContext and MemoryRouter
    // MemoryRouter simulates routing functionality for navigation in tests
    render(
      <UserContext.Provider value={{ user: null }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </UserContext.Provider>
    );

    // Find the link element that contains the company name “DreamStay”
    const companyLink = screen.getByRole("link", { name: /DreamStay/i });

    // Assert that the link has the correct href attribute that points to ‘/‘
    expect(companyLink).toHaveAttribute("href", "/");
  });
});
