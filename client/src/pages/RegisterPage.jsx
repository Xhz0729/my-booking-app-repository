import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-72">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-xl mx-auto">
          <input type="text" placeholder="Doudou" />
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
          <button className="login">Register</button>
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
