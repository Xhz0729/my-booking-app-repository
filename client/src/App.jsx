import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import AddPlaceForm from "./components/AddPlaceForm";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";
import BookingsPage from "./pages/BookingsPage";
import BookingDetailsPage from "./pages/BookingDetailsPage";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/account" element={<ProfilePage />} />
                <Route path="/account/listings" element={<PlacesPage />} />
                <Route
                  path="/account/listings/new"
                  element={<AddPlaceForm />}
                />
                <Route
                  path="/account/listings/:id"
                  element={<AddPlaceForm />}
                />
                <Route path="/place/:id" element={<PlaceDetailsPage />} />
                {/* Add a route for the bookings page */}
                <Route path="/account/bookings" element={<BookingsPage />} />
                {/* Add a route for the booking details page */}
                <Route
                  path="/account/bookings/:id"
                  element={<BookingDetailsPage />}
                />
              </Route>
            </Routes>
          </div>
        </Router>
      </LoadScript>
    </UserContextProvider>
  );
}
export default App;
