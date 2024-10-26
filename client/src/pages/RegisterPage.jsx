import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  // Message to display to the user
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle user input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  async function registerUser(ev) {
    ev.preventDefault();
    // Destructure the form data
    const { name, email, password } = formData;
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      // Instead use a alert to notify the user try to render a message on the page
      setMessage("Registration successful. Redirecting to login page...");
      // Redirect the user to the login page
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (e) {
      setMessage("Registration failed. Please try again later.");
    }
  }

  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-72">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Doudou"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="your@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="login" type="submit">
            Register
          </button>

          {/* Message display */}
          {message && (
            <div className="text-center py-2 text-red-500">{message}</div>
          )}

          <div className="text-center py-2 text-zinc-500">
            Already have an account?{" "}
            <Link className="underline text-black" to={"/login"}>
              Go To Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
