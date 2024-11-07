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

  // Test that render the Header component with search area
  it("renders the search area", () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </UserContext.Provider>
    );
    // Assert that the search area is rendered
    const Where = screen.getByText(/Where/i);
    expect(Where).toBeInTheDocument();

    const When = screen.getByText(/When/i);
    expect(When).toBeInTheDocument();

    const Guests = screen.getByText(/Guests/i);
    expect(Guests).toBeInTheDocument();
  });

  // Test the search button in the Header component
  it("renders the search button", () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </UserContext.Provider>
    );
    // Assert that the search button is rendered
    const searchButton = screen.getByRole("button", { name: /Search/i });
    expect(searchButton).toBeInTheDocument();
  });

  // Test when user exists, the user icon navigates to the account page
  it("navigates to '/account' when user exists", () => {
    // Provide a mock user
    const mockUser = { name: "test" };
    render(
      <UserContext.Provider value={{ user: mockUser }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </UserContext.Provider>
    );
    // Find the link element that contains the user icon
    const userIcon = screen.getByTestId("user-icon");
    // Assert that the link has the correct href attribute that points to ‘/account’
    expect(userIcon).toHaveAttribute("href", "/account");
  });

  // Test when user does not exist, the user icon navigates to the login page
  it("navigates to '/login' when user does not exist", () => {
    render(
      <UserContext.Provider value={{ user: null }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </UserContext.Provider>
    );
    // Find the link element that contains the user icon
    const userIcon = screen.getByTestId("user-icon");
    // Assert that the link has the correct href attribute that points to ‘/login’
    expect(userIcon).toHaveAttribute("href", "/login");
  });

  // Test when user exists, render user name
  it("renders the user name when user exists", () => {
    // Provide a mock user
    const mockUser = { name: "test" };
    render(
      <UserContext.Provider value={{ user: mockUser }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </UserContext.Provider>
    );
    // Find the user name element
    const user = screen.getByText(/test/i);
    // Assert that the user name is rendered
    expect(user).toBeInTheDocument();
  });
});
