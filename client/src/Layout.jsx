import HeaderPage from "./HeaderPage";
import { Outlet } from "react-router-dom";
import React from "react";

const Layout = () => {
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <HeaderPage />
      <Outlet />
    </div>
  );
};

export default Layout;
