import React from "react";
import Sidebar from "./Sidebar";
// import "./common.css";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar className="w-[30%]"/>
      <div className="w-[70%]">{children}</div>
    </div>
  );
};

export default Layout;
