import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-72">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-xl mx-auto">
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
          <button className="login">Login</button>
          <div className="text-center py-2 text-zinc-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
