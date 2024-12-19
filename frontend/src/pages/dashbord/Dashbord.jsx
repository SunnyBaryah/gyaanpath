import React from "react";
// import "./dashbord.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Dashbord = () => {
  const { mycourse } = CourseData();
  return (
    <div className="p-5 w-[80%] bg-[#424242] rounded-md mx-auto flex flex-col justify-center items-center gap-10">
      <h2 className="text-2xl lg:text-5xl  font-semibold text-[#48CFCB]">All Enrolled Courses</h2>
      <div className="flex flex-col lg:flex-row gap-5">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p className="text-[#F5F5F5]">No course Enrolled Yet!</p>
        )}
      </div>
    </div>
  );
};

export default Dashbord;
