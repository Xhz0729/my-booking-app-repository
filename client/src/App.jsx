import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
