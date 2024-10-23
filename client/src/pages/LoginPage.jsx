import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  // initilize a redirect state
  const [redirect, setRedirect] = useState(false);

  // grab the setUser function from UserContext
  const { setUser } = useContext(UserContext);

  // handle user input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle user login submit
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    const { email, password } = formData;
    try {
      // send a POST request to the '/login' endpoint with email and password
      const { data } = await axios.post("/login", { email, password });
      // Update the user state with the user data returned from the API response
      setUser(data.user);
      // TODO: try to use a message state to convey the message instead of alert
      alert("Successfully Login");
      // if login successfully, setRedirect = 'true'
      setRedirect(true);
    } catch (e) {
      alert("Login Failed");
    }
  }

  // redirect to homepage
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-72">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-xl mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="login" type="submit">
            Login
          </button>
          <div className="text-center py-2 text-zinc-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
