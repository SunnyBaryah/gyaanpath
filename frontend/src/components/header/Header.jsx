import React from "react";
// import "./header.css";
import { Link } from "react-router-dom";
import HomeIcon from "/home-icon.svg";
import BookIcon from "/book-icon.svg";
import UserIcon from "/user-icon.svg";
import AboutIcon from "/about-icon.svg";
const Header = ({ isAuth }) => {
  return (
    <header className="bg-[#F5F5F5] h-[10vh] flex items-center justify-between w-[95%] md:w-[80%] mx-auto py-4">
      <div className="text-[#229799] text-2xl font-semibold">GyaanPath</div>

      <div className="flex gap-3 md:gap-6 justify-center items-center text-[#424242]">
        <Link to={"/"}>
          <img className="h-[45px]" src={HomeIcon}/>
        </Link>
        <Link to={"/courses"}>
          <img className="h-[38px]" src={BookIcon}/>
        </Link>
        <Link to={"/about"}>
          <img className="h-[28px]" src={AboutIcon}/>
        </Link>
        {isAuth ? (
          <Link to={"/account"}>
            <img className="h-[30px]" src={UserIcon}/>
          </Link>
        ) : (
          <Link to={"/login"} className="bg-[#229799] px-3 py-2 rounded-md text-white">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
