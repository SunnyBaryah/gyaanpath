import React from "react";
// import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="w-[80%] h-[10vh] mx-auto py-3">
      <div className="flex flex-col justify-center items-center gap-2">
        <p>&copy;2024 GyaanPath. All rights reserved.</p>
        <div className="flex gap-2 text-[#229799]">
          <a href="">
            <AiFillFacebook/>
          </a>
          <a href="">
            <AiFillTwitterSquare />
          </a>
          <a href="">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
