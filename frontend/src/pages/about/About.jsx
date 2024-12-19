import React from "react";
// import "./about.css";

const About = () => {
  return (
    <div className="h-[80vh] w-[80%] flex justify-between items-center mx-auto ">
      <div className="h-[80%] flex flex-col items-center gap-10 bg-[#424242] px-10 py-10 rounded-md">
        <h2 className="text-5xl font-semibold text-[#229799]">About Us</h2>
        <p className="text-xl text-white">
        We are committed to offering a diverse range of high-quality online courses designed to empower individuals to learn, grow, and excel in their chosen fields. Our courses are crafted by experienced instructors who bring both expertise and real-world knowledge to the table, ensuring each course is tailored for maximum engagement, effective learning, and practical application. Whether you are looking to develop new skills, deepen your existing knowledge, or advance your career, our platform provides a supportive and comprehensive learning environment, giving you the tools and resources needed to achieve your personal and professional goals. Join us on a journey of growth and transformation!
        </p>
      </div>
    </div>
  );
};

export default About;
