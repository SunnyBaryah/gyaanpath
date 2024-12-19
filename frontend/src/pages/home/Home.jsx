import React from "react";
import { useNavigate } from "react-router-dom";
// import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";
import learningImage from "/learning-home-img.svg";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[80%] mx-auto flex flex-col gap-10">
      <div className="w-full bg-[#424242] rounded-md p-10">
        <div className="flex flex-col-reverse xl:flex-row gap-10 justify-between items-center">
          <div className="flex flex-col gap-4 md:gap-10 justify-center items-center">
            <h1 className="text-center text-2xl md:text-5xl leading-tight font-semibold text-[#48CFCB]">Welcome to our Learning Platform</h1>
            <p className="text-lg md:text-2xl text-[#F5F5F5]">Learn, Grow, Excel</p>
            <button onClick={() => navigate("/courses")} className="w-[60%] md:w-[40%] px-4 py-4 text-md md:text-xl bg-[#48CFCB] rounded-md hover:scale-105 transition duration-150">
              Get Started
            </button>
          </div>
          <div className="w-[80%] xl:w-[25%] bg-[#F5F5F5] p-4 rounded-md">
            <img className="w-full" src={learningImage}/>
          </div>
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;
