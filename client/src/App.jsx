import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./context/UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import AddPlaceForm from "./components/AddPlaceForm";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<ProfilePage />} />
              <Route path="/account/listings" element={<PlacesPage />} />
              <Route path="/account/listings/new" element={<AddPlaceForm />} />
              <Route path="/account/listings/:id" element={<AddPlaceForm />} />
              <Route path="/place/:id" element={<PlaceDetailsPage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}
export default App;
