import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfilePage from "../pages/ProfilePage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "../context/UserContext";

describe("ProfilePage Component", () => {
  const mockUser = { name: "Test", email: "test@example.com" };

  const renderWithUserContext = (user, ready, subpage = "profile") => {
    return render(
      <MemoryRouter initialEntries={[`/account/${subpage}`]}>
        <UserContext.Provider value={{ user, setUser: vi.fn(), ready }}>
          <Routes>
            <Route path="/account/:subpage" element={<ProfilePage />} />
          </Routes>
        </UserContext.Provider>
      </MemoryRouter>
    );
  };

  // Test when user context is not ready, should say loading
  it("displays loading when user context is not ready", () => {
    renderWithUserContext(null, false);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  // Test when logged in, display user name, email and logout button
  it("displays user info when logged in and subpage is profile", () => {
    renderWithUserContext(mockUser, true, "profile");
    expect(screen.getByText(`${mockUser.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.email}`)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });
});
