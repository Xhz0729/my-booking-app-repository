import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HeaderPage from "./pages/HeaderPage";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HeaderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
